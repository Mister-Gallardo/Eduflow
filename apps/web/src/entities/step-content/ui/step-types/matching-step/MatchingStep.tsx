import type { MatchingContent } from '@eduflow/shared'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { Box, Typography } from '@mui/material'
import { LayoutGroup, motion } from 'motion/react'
import { useCallback, useMemo, useRef, useState } from 'react'

import { trpc } from '@/shared/api/trpc'

import { StepCheckActions } from '../../step-result-actions'

import {
  connectorIconStyles,
  emptyPoolStyles,
  getChipStyles,
  getLeftCardStyles,
  getPairRowStyles,
  getPoolContainerStyles,
  getSlotStyles,
  pairsContainerStyles,
  poolLabelStyles,
} from './MatchingStep.styles'

interface MatchingStepProps {
  content: MatchingContent
  courseId: string
  stepId: string
  isCompleted?: boolean
  savedAnswer?: Record<string, string> | null
}

const isRecordAnswer = (value: unknown): value is Record<string, string> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

// Ключи drag-data
const DND_RIGHT_ID = 'matching/rightId'
const DND_SOURCE_LEFT_ID = 'matching/sourceLeftId' // пусто если из пула

export const MatchingStep = ({
  content,
  courseId,
  stepId,
  isCompleted = false,
  savedAnswer,
}: MatchingStepProps) => {
  const initialPairs = useMemo<Record<string, string>>(
    () => (isRecordAnswer(savedAnswer) ? savedAnswer : {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null)
  const [pairs, setPairs] = useState<Record<string, string>>(initialPairs)
  const [isChecked, setIsChecked] = useState(isCompleted)
  const [isCorrect, setIsCorrect] = useState(isCompleted)
  const [dragOverLeftId, setDragOverLeftId] = useState<string | null>(null)
  const [isDragOverPool, setIsDragOverPool] = useState(false)

  // Ref-ы не вызывают ре-рендер — храним drag-state без лишних подписок
  const draggingRightId = useRef<string | null>(null)
  const draggingSourceLeftId = useRef<string | null>(null)

  const utils = trpc.useUtils()

  const checkStepMutation = trpc.learning.checkStep.useMutation({
    onSuccess: (data) => {
      setIsChecked(true)
      setIsCorrect(data.isCorrect)
      setSelectedLeftId(null)
      if (data.isCorrect) {
        void utils.learning.getCourseNavigation.invalidate({ courseId })
      }
    },
  })

  // ─── Мемоизированные вычисления ───

  const usedRightIds = useMemo(() => new Set(Object.values(pairs)), [pairs])
  const poolItems = useMemo(
    () => content.right.filter((item) => !usedRightIds.has(item.id)),
    [content.right, usedRightIds],
  )
  const isAllPaired = useMemo(
    () => content.left.every((item) => item.id in pairs),
    [content.left, pairs],
  )
  const pairStatus = isChecked ? isCorrect : undefined

  // ─── Click handlers ───

  const handleLeftClick = useCallback(
    (leftId: string) => {
      if (isChecked) return
      setSelectedLeftId((prev) => (prev === leftId ? null : leftId))
    },
    [isChecked],
  )

  const handlePoolChipClick = useCallback(
    (rightId: string) => {
      if (isChecked || !selectedLeftId) return
      setPairs((prev) => ({ ...prev, [selectedLeftId]: rightId }))
      setSelectedLeftId(null)
    },
    [isChecked, selectedLeftId],
  )

  const handleSlotChipClick = useCallback(
    (leftId: string) => {
      if (isChecked) return
      setPairs((prev) => {
        const next = { ...prev }
        delete next[leftId]
        return next
      })
      setSelectedLeftId(null)
    },
    [isChecked],
  )

  // ─── Drag helpers ───

  const applyDrop = useCallback(
    (rightId: string, sourceLeftId: string | null, targetLeftId: string | null) => {
      setPairs((prev) => {
        const next = { ...prev }

        // Освобождаем исходный слот (если тащили из слота)
        if (sourceLeftId) delete next[sourceLeftId]

        if (targetLeftId === null) {
          // Бросили в пул → просто убрали из prev sourceLeftId (уже сделано выше)
          return next
        }

        // Если целевой слот занят — его чип возвращается в исходный слот (swap)
        const occupantId = next[targetLeftId]
        if (occupantId && sourceLeftId) {
          next[sourceLeftId] = occupantId
        }

        next[targetLeftId] = rightId
        return next
      })
      setSelectedLeftId(null)
    },
    [],
  )

  // ─── Drag-start handlers ───

  const handlePoolChipDragStart = useCallback((e: React.DragEvent, rightId: string) => {
    draggingRightId.current = rightId
    draggingSourceLeftId.current = null
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData(DND_RIGHT_ID, rightId)
    e.dataTransfer.setData(DND_SOURCE_LEFT_ID, '')
  }, [])

  const handleSlotChipDragStart = useCallback(
    (e: React.DragEvent, rightId: string, sourceLeftId: string) => {
      draggingRightId.current = rightId
      draggingSourceLeftId.current = sourceLeftId
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData(DND_RIGHT_ID, rightId)
      e.dataTransfer.setData(DND_SOURCE_LEFT_ID, sourceLeftId)
    },
    [],
  )

  const handleDragEnd = useCallback(() => {
    draggingRightId.current = null
    draggingSourceLeftId.current = null
    setDragOverLeftId(null)
    setIsDragOverPool(false)
  }, [])

  // ─── Slot drop handlers ───

  const handleSlotDragOver = useCallback((e: React.DragEvent, leftId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverLeftId(leftId)
    setIsDragOverPool(false)
  }, [])

  const handleSlotDragLeave = useCallback(() => {
    setDragOverLeftId(null)
  }, [])

  const handleSlotDrop = useCallback(
    (e: React.DragEvent, targetLeftId: string) => {
      e.preventDefault()
      setDragOverLeftId(null)
      const rightId = e.dataTransfer.getData(DND_RIGHT_ID)
      const sourceLeftId = e.dataTransfer.getData(DND_SOURCE_LEFT_ID) || null
      if (!rightId) return
      applyDrop(rightId, sourceLeftId, targetLeftId)
    },
    [applyDrop],
  )

  // ─── Pool drop handlers (drag из слота → обратно в пул) ───

  const handlePoolDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOverPool(true)
    setDragOverLeftId(null)
  }, [])

  const handlePoolDragLeave = useCallback(() => {
    setIsDragOverPool(false)
  }, [])

  const handlePoolDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOverPool(false)
      const rightId = e.dataTransfer.getData(DND_RIGHT_ID)
      const sourceLeftId = e.dataTransfer.getData(DND_SOURCE_LEFT_ID) || null
      if (!rightId || !sourceLeftId) return // из пула в пул — ничего не делаем
      applyDrop(rightId, sourceLeftId, null)
    },
    [applyDrop],
  )

  // ─── Check / Retry ───

  const handleCheck = useCallback(() => {
    if (!isAllPaired || checkStepMutation.isPending) return
    checkStepMutation.mutate({ courseId, stepId, answer: pairs })
  }, [isAllPaired, checkStepMutation, courseId, stepId, pairs])

  const handleRetry = useCallback(() => {
    setPairs({})
    setSelectedLeftId(null)
    setIsChecked(false)
    setIsCorrect(false)
  }, [])

  return (
    <LayoutGroup>
      <Box sx={{ mt: 3 }}>
        {/* Пары: левые карточки + слоты */}
        <Box sx={pairsContainerStyles}>
          {content.left.map((leftItem) => {
            const matchedRightId = pairs[leftItem.id]
            const matchedRight = content.right.find((r) => r.id === matchedRightId)
            const isActive = selectedLeftId === leftItem.id
            const isMatched = matchedRight !== undefined
            const isDragOver = dragOverLeftId === leftItem.id

            return (
              <Box key={leftItem.id} sx={getPairRowStyles(isActive, isDragOver)}>
                {/* Левая карточка */}
                <Box
                  onClick={() => handleLeftClick(leftItem.id)}
                  sx={getLeftCardStyles(isActive, isChecked, isMatched)}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
                    {leftItem.content}
                  </Typography>
                </Box>

                {/* Соединительная иконка */}
                <Box sx={connectorIconStyles}>
                  <SyncAltIcon sx={{ fontSize: 18, display: { xs: 'none', sm: 'block' } }} />
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: 18, display: { xs: 'block', sm: 'none' } }}
                  />
                </Box>

                {/* Слот — drop target */}
                <Box
                  sx={getSlotStyles(isMatched, isDragOver, isChecked)}
                  onDragOver={!isChecked ? (e) => handleSlotDragOver(e, leftItem.id) : undefined}
                  onDragLeave={!isChecked ? handleSlotDragLeave : undefined}
                  onDrop={!isChecked ? (e) => handleSlotDrop(e, leftItem.id) : undefined}
                >
                  {matchedRight ? (
                    <motion.div
                      key={matchedRight.id}
                      layoutId={matchedRight.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.12 }}
                      style={{ width: '100%' }}
                      draggable={!isChecked}
                      onDragStart={
                        !isChecked
                          ? (e) =>
                              handleSlotChipDragStart(
                                e as unknown as React.DragEvent,
                                matchedRight.id,
                                leftItem.id,
                              )
                          : undefined
                      }
                      onDragEnd={!isChecked ? handleDragEnd : undefined}
                    >
                      <Box
                        onClick={() => handleSlotChipClick(leftItem.id)}
                        sx={getChipStyles(isChecked, pairStatus, false)}
                      >
                        {isChecked &&
                          pairStatus !== undefined &&
                          (pairStatus ? (
                            <CheckCircleOutlinedIcon sx={{ fontSize: 15, flexShrink: 0 }} />
                          ) : (
                            <CancelOutlinedIcon sx={{ fontSize: 15, flexShrink: 0 }} />
                          ))}
                        <Typography
                          component="span"
                          sx={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 1.4 }}
                        >
                          {matchedRight.content}
                        </Typography>
                      </Box>
                    </motion.div>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: isDragOver
                          ? 'primary.main'
                          : isActive
                            ? 'primary.main'
                            : 'text.disabled',
                        transition: 'color 0.15s',
                      }}
                    >
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: 16,
                          flexShrink: 0,
                          opacity: isActive || isDragOver ? 1 : 0.45,
                          transition: 'opacity 0.15s',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontStyle: 'italic',
                          color: 'inherit',
                          lineHeight: 1.4,
                        }}
                      >
                        {isDragOver
                          ? 'Отпустите здесь'
                          : isActive
                            ? 'Выберите ниже'
                            : 'Нажмите, затем выберите ↓'}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Пул правых чипов */}
        {!isChecked && (
          <Box sx={{ mt: 3 }}>
            <Typography sx={poolLabelStyles}>Варианты ответов</Typography>
            <Box
              sx={getPoolContainerStyles(isDragOverPool)}
              onDragOver={handlePoolDragOver}
              onDragLeave={handlePoolDragLeave}
              onDrop={handlePoolDrop}
            >
              {poolItems.length === 0 ? (
                <Box sx={emptyPoolStyles}>
                  <DoneAllIcon sx={{ fontSize: 18, mb: 0.5 }} />
                  <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                    Все варианты расставлены
                  </Typography>
                </Box>
              ) : (
                poolItems.map((rightItem) => (
                  <motion.div
                    key={rightItem.id}
                    layoutId={rightItem.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.12, ease: 'easeOut' }}
                    style={{ cursor: isChecked ? 'default' : 'grab' }}
                    draggable={!isChecked}
                    onDragStart={
                      !isChecked
                        ? (e) =>
                            handlePoolChipDragStart(e as unknown as React.DragEvent, rightItem.id)
                        : undefined
                    }
                    onDragEnd={!isChecked ? handleDragEnd : undefined}
                  >
                    <Box
                      onClick={() => handlePoolChipClick(rightItem.id)}
                      sx={getChipStyles(false, undefined, true)}
                    >
                      <Typography
                        component="span"
                        sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}
                      >
                        {rightItem.content}
                      </Typography>
                    </Box>
                  </motion.div>
                ))
              )}
            </Box>
          </Box>
        )}

        <StepCheckActions
          canCheck={isAllPaired}
          isPending={checkStepMutation.isPending}
          isChecked={isChecked}
          isCorrect={isCorrect}
          onCheck={handleCheck}
          onRetry={handleRetry}
        />
      </Box>
    </LayoutGroup>
  )
}
