import { useState } from 'react'

import type { SolveInputStepProps } from './types'
import { useStepAction } from './use-step-action'

export const useInputStep = ({ courseId, stepId, status, savedAnswer }: SolveInputStepProps) => {
  const [value, setValue] = useState(String(savedAnswer ?? ''))

  const { isSubmitted, isCorrect, isPending, mutate, setIsSubmitted, setIsCorrect } = useStepAction(
    {
      courseId,
      stepId,
      status,
      mode: 'auto',
    },
  )

  const handleChange = (newValue: string) => {
    if (isSubmitted) return
    setValue(newValue)
  }

  const handleCheck = () => {
    if (!value.trim() || isPending) return

    mutate({ courseId, stepId, answer: value.trim() })
  }

  const handleRetry = () => {
    setValue('')
    setIsSubmitted(false)
    setIsCorrect(false)
  }

  return {
    value,
    isSubmitted,
    isCorrect,
    isPending,
    canCheck: value.trim().length > 0,
    onChange: handleChange,
    onCheck: handleCheck,
    onRetry: handleRetry,
  }
}
