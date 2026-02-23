import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react'

import type { SolveMatchingStepProps } from './types'
import { useCheckStep } from './use-check-step'

const isRecordAnswer = (value: unknown): value is Record<string, string> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const useMatchingStep = ({
  content,
  courseId,
  stepId,
  isCompleted = false,
  savedAnswer,
}: SolveMatchingStepProps) => {
  const initialPairs = isRecordAnswer(savedAnswer) ? savedAnswer : {}

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null)
  const [pairs, setPairs] = useState<Record<string, string>>(initialPairs)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const { isChecked, isCorrect, isPending, mutate, setIsChecked, setIsCorrect } = useCheckStep({
    courseId,
    stepId,
    isCompleted,
    onSuccess: () => {
      setSelectedLeftId(null)
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
    if (!isAllPaired || isPending) return

    mutate({ courseId, stepId, answer: pairs })
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
    isPending,
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
