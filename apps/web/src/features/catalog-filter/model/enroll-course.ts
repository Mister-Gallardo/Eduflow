import { useNavigate } from 'react-router-dom'

import { trpc } from '@/shared/api/trpc'
import { messages } from '@/shared/config/messages'
import { paths } from '@/shared/config/paths'
import { useSnackbar } from '@/shared/ui/feedback/snackbar'

export const useEnrollCourse = () => {
  const navigate = useNavigate()

  const utils = trpc.useUtils()

  const showSnackbar = useSnackbar()

  const enrollMutation = trpc.enrollment.enroll.useMutation({
    onSuccess: (data, variables) => {
      void navigate(paths.course.view(variables.courseId))

      if (data.message !== 'Already enrolled') {
        void utils.enrollment.getEnrolledCourses.invalidate()

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
