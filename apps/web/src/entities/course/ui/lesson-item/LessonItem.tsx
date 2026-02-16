import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
  Box,
  CircularProgress,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import type { NavigationLesson } from '@/entities/course'
import { useSidebarAction } from '@/entities/course/lib'
import { paths } from '@/shared/config'
import { tooltipTextSecondaryStyles } from '@/shared/ui/styles'

import { lessonStyles, lessonTitleStyles } from './LessonItem.styles'

interface LessonItemProps {
  lesson: NavigationLesson
  courseId: string
}

export const LessonItem = ({ lesson, courseId }: LessonItemProps) => {
  const { onClose } = useSidebarAction()

  const { stepId: currentStepId } = useParams()

  const totalSteps = lesson.steps.length
  const completedSteps = lesson.steps.filter((s) => s.isCompleted).length
  const isFullyCompleted = totalSteps > 0 && completedSteps === totalSteps
  const hasProgress = completedSteps > 0

  const isActive = lesson.steps.some((s) => s.id === currentStepId)

  const firstStepId = lesson.steps[0]?.id
  const firstUnfinishedStep = lesson.steps.find((s) => !s.isCompleted)
  const targetStepId = firstUnfinishedStep?.id ?? firstStepId
  const lessonPath = paths.learn.setup(courseId, targetStepId)

  const progressText = isFullyCompleted
    ? 'Выполнено'
    : `${completedSteps} из ${totalSteps} шагов пройдено`

  return (
    <Tooltip
      title={
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {isFullyCompleted ? (
              <CheckCircleIcon
                sx={{
                  fontSize: 16,
                  color: 'customColors.green',
                }}
              />
            ) : (
              completedSteps > 0 && (
                <CircularProgress
                  variant="determinate"
                  value={totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0}
                  size={16}
                  thickness={6}
                  sx={{ color: 'customColors.green' }}
                />
              )
            )}
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 13 }}>
              {lesson.title}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              ...tooltipTextSecondaryStyles,
              ml: completedSteps > 0 ? 3.5 : 0,
            }}
          >
            {progressText}
          </Typography>
        </Box>
      }
      placement="right"
    >
      <ListItemButton
        component={Link}
        to={lessonPath}
        onClick={() => onClose?.()}
        selected={isActive}
        disableRipple
        sx={lessonStyles}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isFullyCompleted ? (
            <CheckCircleIcon sx={{ fontSize: 18, display: 'block', color: 'customColors.green' }} />
          ) : (
            <CircularProgress
              variant="determinate"
              value={totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0}
              size={18}
              thickness={hasProgress ? 5 : 4}
              sx={{
                color: 'customColors.green',
              }}
            />
          )}
        </Box>

        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                ...lessonTitleStyles,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {lesson.title}
            </Typography>
          }
        />
      </ListItemButton>
    </Tooltip>
  )
}
