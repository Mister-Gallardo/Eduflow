import type { StepStatus } from '@eduflow/shared'
import { useState } from 'react'

import { trpc } from '../../../shared/api/trpc'
import { messages } from '../../../shared/config/messages'
import { useSnackbar } from '../../../shared/ui/feedback/snackbar'

interface UseStepActionProps {
  courseId: string
  stepId: string
  status?: StepStatus
  mode: 'auto' | 'manual'
  onSuccess?: (data?: { isCorrect: boolean }) => void
}

export const useStepAction = ({
  courseId,
  stepId,
  status,
  mode,
  onSuccess,
}: UseStepActionProps) => {
  const showSnackbar = useSnackbar()

  const utils = trpc.useUtils()

  const initialIsSubmitted =
    status === 'APPROVED' || status === 'FAILED' || (mode === 'manual' && status === 'PENDING')

  const [isSubmitted, setIsSubmitted] = useState(initialIsSubmitted)
  const [isCorrect, setIsCorrect] = useState(status === 'APPROVED')

  const commonOptions = {
    onError: () => {
      void showSnackbar({
        message: messages.genericError,
        severity: 'error',
      })
    },
  }

  const checkMutation = trpc.learning.checkStep.useMutation({
    onSuccess: async (data) => {
      await utils.learning.getStepData.invalidate({ courseId, stepId })

      setIsSubmitted(true)
      setIsCorrect(data.isCorrect)

      if (data.isCorrect) {
        void utils.learning.getCourseNavigation.invalidate({ courseId })
      }
      onSuccess?.(data)
    },
    ...commonOptions,
  })

  const submitMutation = trpc.learning.completeStep.useMutation({
    onSuccess: async () => {
      await utils.learning.getStepData.invalidate({ courseId, stepId })

      setIsSubmitted(true)

      void utils.learning.getCourseNavigation.invalidate({ courseId })

      onSuccess?.()
    },
    ...commonOptions,
  })

  const isPending = mode === 'auto' ? checkMutation.isPending : submitMutation.isPending

  return {
    isSubmitted,
    setIsSubmitted,
    isCorrect,
    setIsCorrect,
    isPending,
    mutate: mode === 'auto' ? checkMutation.mutate : submitMutation.mutate,
  }
}
