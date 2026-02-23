import { useState } from 'react'

import { trpc } from '../../../shared/api/trpc'
import { messages } from '../../../shared/config/messages'
import { useSnackbar } from '../../../shared/ui/feedback/snackbar'

interface UseStepMutationProps {
  courseId: string
  stepId: string
  isCompleted: boolean
  onSuccess?: (data: { isCorrect: boolean }) => void
}

export const useCheckStep = ({
  courseId,
  stepId,
  isCompleted,
  onSuccess,
}: UseStepMutationProps) => {
  const showSnackbar = useSnackbar()

  const utils = trpc.useUtils()

  const [isChecked, setIsChecked] = useState(isCompleted)
  const [isCorrect, setIsCorrect] = useState(isCompleted)

  const mutation = trpc.learning.checkStep.useMutation({
    onSuccess: (data) => {
      setIsChecked(true)
      setIsCorrect(data.isCorrect)

      if (data.isCorrect) {
        void utils.learning.getCourseNavigation.invalidate({ courseId })
      }
      onSuccess?.(data)
    },
    onError: () => {
      void showSnackbar({
        message: messages.genericError,
        severity: 'error',
      })
    },
    onSettled: () => {
      void utils.learning.getStepData.invalidate({ courseId, stepId })
    },
  })

  return {
    isChecked,
    setIsChecked,
    isCorrect,
    setIsCorrect,
    isPending: mutation.isPending,
    mutate: mutation.mutate,
  }
}
