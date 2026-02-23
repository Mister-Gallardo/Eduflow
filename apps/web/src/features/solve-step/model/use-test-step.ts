import { useState } from 'react'

import type { SolveTestStepProps } from './types'
import { useCheckStep } from './use-check-step'

export const useTestStep = ({
  testType,
  courseId,
  stepId,
  isCompleted = false,
  savedAnswer,
}: SolveTestStepProps) => {
  const isMultiple = testType === 'TEST_MULTIPLE'

  const initialSelection = Array.isArray(savedAnswer)
    ? savedAnswer
    : savedAnswer
      ? [savedAnswer]
      : []

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelection))

  const { isChecked, isCorrect, isPending, mutate, setIsChecked, setIsCorrect } = useCheckStep({
    courseId,
    stepId,
    isCompleted,
  })

  const handleSelectOption = (optionId: string) => {
    if (isChecked) return

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
    setIsChecked(false)
    setIsCorrect(false)
  }

  return {
    selectedIds,
    isChecked,
    isCorrect,
    isPending,
    canCheck: selectedIds.size > 0,
    onSelectOption: handleSelectOption,
    onCheck: handleCheck,
    onRetry: handleRetry,
  }
}
