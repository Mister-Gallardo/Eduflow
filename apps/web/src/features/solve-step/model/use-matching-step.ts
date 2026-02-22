import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react'

import { trpc } from '@/shared/api/trpc'
import { messages } from '@/shared/config/messages'
import { useSnackbar } from '@/shared/ui/feedback/snackbar'

import type { SolveMatchingStepProps } from './types'

const isRecordAnswer = (value: unknown): value is Record<string, string> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const useMatchingStep = ({
  content,
  courseId,
  stepId,
  isCompleted = false,
  savedAnswer,
}: SolveMatchingStepProps) => {
  const showSnackbar = useSnackbar()

  const initialPairs = isRecordAnswer(savedAnswer) ? savedAnswer : {}

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null)
  const [pairs, setPairs] = useState<Record<string, string>>(initialPairs)
  const [isChecked, setIsChecked] = useState(isCompleted)
  const [isCorrect, setIsCorrect] = useState(isCompleted)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

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
    onError: () => {
      void showSnackbar({
        message: messages.genericError,
        severity: 'error',
      })
    },
  })

  const applyDrop = (rightId: string, targetId: string) => {
    setPairs((prev) => {
      const next = { ...prev }
      const sourceLeftId = Object.keys(next).find((k) => next[k] === rightId)

      if (sourceLeftId) delete next[sourceLeftId]

      if (targetId === 'pool') return next

      const occupantId = next[targetId]
      if (occupantId && occupantId !== rightId && sourceLeftId) {
        next[sourceLeftId] = occupantId
      }

      next[targetId] = rightId
      return next
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id.toString())
    setSelectedLeftId(null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null)
    const { active, over } = event

    if (!over) return

    applyDrop(active.id.toString(), over.id.toString())
  }

  const handleDragCancel = () => {
    setActiveDragId(null)
  }

  const handleLeftClick = (leftId: string) => {
    if (isChecked) return

    setSelectedLeftId((prev) => (prev === leftId ? null : leftId))
  }

  const handlePoolChipClick = (rightId: string) => {
    if (isChecked || !selectedLeftId) return

    applyDrop(rightId, selectedLeftId)

    setSelectedLeftId(null)
  }

  const handleSlotChipClick = (_leftId: string, rightId: string) => {
    if (isChecked) return

    applyDrop(rightId, 'pool')

    setSelectedLeftId(null)
  }

  const isAllPaired = content.left.every((item) => item.id in pairs)

  const handleCheck = () => {
    if (!isAllPaired || checkStepMutation.isPending) return

    checkStepMutation.mutate({ courseId, stepId, answer: pairs })
  }

  const handleRetry = () => {
    setPairs({})
    setSelectedLeftId(null)
    setIsChecked(false)
    setIsCorrect(false)
  }

  return {
    displayContent: content,
    pairs,
    selectedLeftId,
    isChecked,
    isCorrect,
    isPending: checkStepMutation.isPending,
    canCheck: isAllPaired,
    activeDragId,

    callbacks: {
      onLeftClick: handleLeftClick,
      onPoolChipClick: handlePoolChipClick,
      onSlotChipClick: handleSlotChipClick,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onDragCancel: handleDragCancel,
    },

    onCheck: handleCheck,
    onRetry: handleRetry,
  }
}
