import { useNavigate } from 'react-router-dom'

import { paths } from '@/shared/config/paths'

export const useEnrollCourse = () => {
  const navigate = useNavigate()

  const enroll = (courseId: string) => {
    void navigate(paths.learn.setup(courseId), { state: { enroll: true } })
  }

  return { enroll }
}
