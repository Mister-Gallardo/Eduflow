import { useState } from 'react'

import type { SolveInputStepProps } from './types'
import { useCheckStep } from './use-check-step'

export const useInputStep = ({
  courseId,
  stepId,
  isCompleted = false,
  savedAnswer,
}: SolveInputStepProps) => {
  const [value, setValue] = useState(String(savedAnswer ?? ''))

  const { isChecked, isCorrect, isPending, mutate, setIsChecked, setIsCorrect } = useCheckStep({
    courseId,
    stepId,
    isCompleted,
  })

  const handleChange = (newValue: string) => {
    if (isChecked) return
    setValue(newValue)
  }

  const handleCheck = () => {
    if (!value.trim() || isPending) return
    mutate({ courseId, stepId, answer: value.trim() })
  }

  const handleRetry = () => {
    setValue('')
    setIsChecked(false)
    setIsCorrect(false)
  }

  return {
    value,
    isChecked,
    isCorrect,
    isPending,
    canCheck: value.trim().length > 0,
    onChange: handleChange,
    onCheck: handleCheck,
    onRetry: handleRetry,
  }
}
