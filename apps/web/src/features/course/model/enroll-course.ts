import { useNavigate } from 'react-router-dom'

import { trpc } from '@/shared/api/trpc'
import { messages } from '@/shared/config/messages'
import { paths } from '@/shared/config/paths'
import { useSnackbar } from '@/shared/ui/feedback/snackbar'

export const useEnrollCourse = () => {
  const navigate = useNavigate()

  const showSnackbar = useSnackbar()

  const enrollMutation = trpc.learning.enroll.useMutation({
    onSuccess: (data, variables) => {
      void navigate(paths.learn.setup(variables.courseId))

      if (data.message !== 'Already enrolled') {
        void showSnackbar({
          message: messages.enrollSuccess,
          severity: 'success',
        })
      }
    },
    onError: () => {
      void showSnackbar({
        message: messages.genericError,
        severity: 'error',
      })
    },
  })

  const enroll = (courseId: string) => {
    enrollMutation.mutate({ courseId })
  }

  return { enroll, isEnrollPending: enrollMutation.isPending }
}
