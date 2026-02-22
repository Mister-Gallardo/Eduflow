import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { MatchingContent } from '@eduflow/shared'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { Box, Typography } from '@mui/material'

import { MotionBox } from '@/shared/ui/animations/motion'

import { getMatchingLeftCardStyles } from '../../../lib/utils'

import { DraggableChip, DroppablePool, DroppableSlot } from './components'
import {
  connectorIconStyles,
  emptyPoolStyles,
  getPairRowStyles,
  pairsContainerStyles,
  poolLabelStyles,
} from './MatchingStep.styles'

export interface MatchingStepCallbacks {
  onLeftClick: (leftId: string) => void
  onPoolChipClick: (rightId: string) => void
  onSlotChipClick: (leftId: string, rightId: string) => void
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
  onDragCancel?: () => void
}

export interface MatchingStepProps {
  content: MatchingContent
  pairs: Record<string, string>
  selectedLeftId: string | null
  isChecked: boolean
  pairStatus?: boolean
  activeDragId?: string | null
  callbacks: MatchingStepCallbacks
}

export const MatchingStep = ({
  content,
  pairs,
  selectedLeftId,
  isChecked,
  pairStatus,
  callbacks,
}: MatchingStepProps) => {
  const usedRightIds = new Set(Object.values(pairs))
  const poolItems = content.right.filter((item) => !usedRightIds.has(item.id))

  return (
    <Box>
      <Box sx={pairsContainerStyles}>
        {content.left.map((leftItem) => {
          const matchedRightId = pairs[leftItem.id]
          const matchedRight = content.right.find((r) => r.id === matchedRightId)
          const isActive = selectedLeftId === leftItem.id
          const isMatched = Boolean(matchedRight)

          return (
            <Box key={leftItem.id} sx={getPairRowStyles(isActive, false)}>
              <Box
                onClick={() => callbacks.onLeftClick(leftItem.id)}
                sx={getMatchingLeftCardStyles(isActive, isChecked, isMatched)}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
                  {leftItem.content}
                </Typography>
              </Box>

              <Box sx={connectorIconStyles}>
                <SyncAltIcon sx={{ fontSize: 18, display: { xs: 'none', sm: 'block' } }} />
                <KeyboardArrowDownIcon
                  sx={{ fontSize: 18, display: { xs: 'block', sm: 'none' } }}
                />
              </Box>

              <DroppableSlot leftId={leftItem.id} isMatched={isMatched} isChecked={isChecked}>
                {matchedRight ? (
                  <MotionBox
                    key={matchedRight.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    sx={{ width: '100%' }}
                  >
                    <DraggableChip
                      id={matchedRight.id}
                      content={matchedRight.content}
                      isChecked={isChecked}
                      isCorrect={pairStatus}
                      isInPool={false}
                      onClick={() => callbacks.onSlotChipClick(leftItem.id, matchedRight.id)}
                    />
                  </MotionBox>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      px: 1.5,
                      alignItems: 'center',
                      gap: 0.5,
                      color: isActive ? 'text.main' : 'text.disabled',
                    }}
                  >
                    {isActive ? (
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ) : (
                      <KeyboardArrowLeftIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontStyle: 'italic',
                      }}
                    >
                      {isActive ? 'Выберите ниже' : 'Нажмите, чтобы выбрать или перетащите'}
                    </Typography>
                  </Box>
                )}
              </DroppableSlot>
            </Box>
          )
        })}
      </Box>

      {!isChecked && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={poolLabelStyles}>Варианты ответов</Typography>
          <DroppablePool isChecked={isChecked}>
            {poolItems.length === 0 ? (
              <Box sx={emptyPoolStyles}>
                <DoneAllIcon sx={{ fontSize: 18, mb: 0.5 }} />
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  Все варианты расставлены
                </Typography>
              </Box>
            ) : (
              poolItems.map((rightItem) => (
                <MotionBox
                  key={rightItem.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                >
                  <DraggableChip
                    id={rightItem.id}
                    content={rightItem.content}
                    isChecked={false}
                    isCorrect={undefined}
                    isInPool={true}
                    onClick={() => callbacks.onPoolChipClick(rightItem.id)}
                  />
                </MotionBox>
              ))
            )}
          </DroppablePool>
        </Box>
      )}
    </Box>
  )
}
