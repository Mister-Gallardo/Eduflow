import { useState } from 'react'

import type { SolveFreeTextStepProps } from './types'
import { useStepAction } from './use-step-action'

export const useFreeTextStep = ({
  content,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveFreeTextStepProps) => {
  const minLength = content.minLength ?? 0

  const [value, setValue] = useState(String(savedAnswer ?? ''))

  const { isSubmitted, setIsSubmitted, isPending, mutate } = useStepAction({
    courseId,
    stepId,
    status,
    mode: 'manual',
  })

  const canSubmit = !isSubmitted && value.trim().length >= Math.max(minLength, 1)

  const handleChange = (newValue: string) => {
    if (isSubmitted) return

    setValue(newValue)
  }

  const handleSubmit = () => {
    if (!canSubmit || isPending) return

    mutate({ courseId, stepId, answer: value.trim() })
  }

  const handleRetry = () => {
    setValue(String(savedAnswer ?? ''))
    setIsSubmitted(false)
  }

  return {
    value,
    isSubmitted,
    isPending,
    canSubmit,
    charCount: value.length,
    minLength,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onRetry: handleRetry,
  }
}
