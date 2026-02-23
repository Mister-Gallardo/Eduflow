import { useState } from 'react'

import type { SolveTestStepProps } from './types'
import { useStepAction } from './use-step-action'

export const useTestStep = ({
  testType,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveTestStepProps) => {
  const isMultiple = testType === 'TEST_MULTIPLE'

  const initialSelection = Array.isArray(savedAnswer)
    ? savedAnswer
    : savedAnswer
      ? [savedAnswer]
      : []

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelection))

  const { isSubmitted, isCorrect, isPending, mutate, setIsSubmitted, setIsCorrect } = useStepAction(
    {
      courseId,
      stepId,
      status,
      mode: 'auto',
    },
  )

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return

    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (isMultiple) {
        if (next.has(optionId)) next.delete(optionId)
        else next.add(optionId)
      } else {
        next.clear()
        next.add(optionId)
      }
      return next
    })
  }

  const handleCheck = () => {
    if (selectedIds.size === 0 || isPending) return

    const answer = isMultiple ? [...selectedIds] : [...selectedIds][0]

    mutate({ courseId, stepId, answer })
  }

  const handleRetry = () => {
    setSelectedIds(new Set())
    setIsSubmitted(false)
    setIsCorrect(false)
  }

  return {
    selectedIds,
    isSubmitted,
    isCorrect,
    isPending,
    canCheck: selectedIds.size > 0,
    onSelectOption: handleSelectOption,
    onCheck: handleCheck,
    onRetry: handleRetry,
  }
}
