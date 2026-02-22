import { useState } from 'react'

import { trpc } from '@/shared/api/trpc'
import { messages } from '@/shared/config/messages'
import { useSnackbar } from '@/shared/ui/feedback/snackbar'

import type { SolveTestStepProps } from './types'

export const useTestStep = ({
  testType,
  courseId,
  stepId,
  isCompleted = false,
  savedAnswer,
}: SolveTestStepProps) => {
  const showSnackbar = useSnackbar()

  const isMultiple = testType === 'TEST_MULTIPLE'

  const initialSelection = Array.isArray(savedAnswer)
    ? savedAnswer
    : savedAnswer
      ? [savedAnswer]
      : []

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelection))
  const [isChecked, setIsChecked] = useState(isCompleted)
  const [isCorrect, setIsCorrect] = useState(isCompleted)

  const utils = trpc.useUtils()

  const checkStepMutation = trpc.learning.checkStep.useMutation({
    onSuccess: (data) => {
      setIsChecked(true)
      setIsCorrect(data.isCorrect)
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
    if (selectedIds.size === 0 || checkStepMutation.isPending) return
    const answer = isMultiple ? [...selectedIds] : [...selectedIds][0]
    checkStepMutation.mutate({ courseId, stepId, answer })
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
    isPending: checkStepMutation.isPending,
    canCheck: selectedIds.size > 0,
    onSelectOption: handleSelectOption,
    onCheck: handleCheck,
    onRetry: handleRetry,
  }
}
