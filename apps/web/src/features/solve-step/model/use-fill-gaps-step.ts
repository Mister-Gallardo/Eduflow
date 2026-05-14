import { useState } from 'react'

import type { SolveFillGapsStepProps } from './types'
import { useStepAction } from './use-step-action'

const isRecordAnswer = (value: unknown): value is Record<string, string> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const useFillGapsStep = ({
  content,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveFillGapsStepProps) => {
  const initialAnswers = isRecordAnswer(savedAnswer) ? savedAnswer : {}

  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers)

  const { isSubmitted, isCorrect, isPending, mutate, setIsSubmitted, setIsCorrect } = useStepAction(
    {
      courseId,
      stepId,
      status,
      mode: 'auto',
    },
  )

  const handleAnswerChange = (gapId: string, value: string) => {
    if (isSubmitted) return
    setAnswers((prev) => ({ ...prev, [gapId]: value }))
  }

  /** Результаты проверки по каждому gap-у (для UI) */
  const getGapResults = (): Record<string, boolean> => {
    if (!isSubmitted) return {}
    const results: Record<string, boolean> = {}
    for (const gap of content.gaps) {
      const userVal = (answers[gap.id] ?? '').trim().toLowerCase()
      const correctVal = (gap.correctAnswer ?? '').trim().toLowerCase()
      results[gap.id] = userVal === correctVal
    }
    return results
  }

  const allFilled = content.gaps.every((gap) => (answers[gap.id] ?? '').trim().length > 0)

  const handleCheck = () => {
    if (!allFilled || isPending) return
    mutate({ courseId, stepId, answer: answers })
  }

  const handleRetry = () => {
    setAnswers({})
    setIsSubmitted(false)
    setIsCorrect(false)
  }

  return {
    displayContent: content,
    answers,
    isSubmitted,
    isCorrect,
    isPending,
    canCheck: allFilled,
    gapResults: getGapResults(),
    onAnswerChange: handleAnswerChange,
    onCheck: handleCheck,
    onRetry: handleRetry,
  }
}
