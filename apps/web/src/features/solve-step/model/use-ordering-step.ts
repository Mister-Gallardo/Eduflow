import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

import type { SolveOrderingStepProps } from './types'
import { useStepAction } from './use-step-action'

export const useOrderingStep = ({
  content,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveOrderingStepProps) => {
  const initialOrder = Array.isArray(savedAnswer)
    ? savedAnswer
    : content.items.map((item) => item.id)

  const [orderedIds, setOrderedIds] = useState<string[]>(initialOrder)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const { isSubmitted, isCorrect, isPending, mutate, setIsSubmitted, setIsCorrect } = useStepAction(
    {
      courseId,
      stepId,
      status,
      mode: 'auto',
    },
  )

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null)
    const { active, over } = event

    if (!over || active.id === over.id) return

    setOrderedIds((prev) => {
      const oldIndex = prev.indexOf(active.id.toString())
      const newIndex = prev.indexOf(over.id.toString())
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const handleDragStart = (event: DragEndEvent) => {
    setActiveDragId(event.active.id.toString())
  }

  const handleDragCancel = () => {
    setActiveDragId(null)
  }

  const handleCheck = () => {
    if (isPending) return
    mutate({ courseId, stepId, answer: orderedIds })
  }

  const handleRetry = () => {
    setOrderedIds(content.items.map((item) => item.id))
    setIsSubmitted(false)
    setIsCorrect(false)
  }

  return {
    displayContent: content,
    orderedIds,
    isSubmitted,
    isCorrect,
    isPending,
    activeDragId,
    canCheck: true,

    callbacks: {
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onDragCancel: handleDragCancel,
    },

    onCheck: handleCheck,
    onRetry: handleRetry,
  }
}
