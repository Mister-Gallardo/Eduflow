import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'

import { paths } from '@/shared/config'
import type { LearnOutletContext } from '@/widgets/course-sidebar/model'

export const LearnPage = () => {
  const { courseId = '', stepId } = useParams()
  const navigate = useNavigate()
  const { navigation, lastViewedStepId } = useOutletContext<LearnOutletContext>()

  // Редирект на последний просмотренный шаг, если stepId отсутствует в URL
  useEffect(() => {
    if (stepId || !lastViewedStepId) return

    void navigate(paths.learn.setup(courseId, lastViewedStepId), { replace: true })
  }, [stepId, lastViewedStepId, courseId, navigate])

  // Пока нет stepId (до редиректа) — ничего не показываем
  if (!stepId) return null

  return (
    <Box sx={{ height: '500vw' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Контент шага
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Step ID: {stepId}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
        Модулей: {navigation.length}
      </Typography>
      <Button
        onClick={() =>
          navigate('/learn/course/cmllenjhk0001aqlvg99aj0xl/step/cmllenjhs000waqlvjbx0uqfe')
        }
      >
        qwe
      </Button>
    </Box>
  )
}
