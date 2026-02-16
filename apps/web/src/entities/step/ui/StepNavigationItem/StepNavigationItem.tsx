import { alpha, Box, darken, Tooltip, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

import type { NavigationStep } from '@/entities/course'
import { paths } from '@/shared/config'
import { getStepIcon } from '@/widgets/lesson-steps-panel/lib/get-step-icon'

import { stepItemStyles } from './StepNavigationItem.styles'

interface StepProps {
  step: NavigationStep
  isActive: boolean
  courseId: string
}

export const StepNavigationItem = ({ step, isActive, courseId }: StepProps) => {
  const theme = useTheme()

  const isCompleted = step.isCompleted
  const Icon = getStepIcon(step.type)

  let bgColor = alpha(theme.palette.primary.main, 0.06)
  let borderColor = 'transparent'
  let iconColor = alpha(theme.palette.primary.main, 0.8)

  if (isCompleted) {
    bgColor = alpha(theme.palette.customColors.green, 0.18)
    borderColor = theme.palette.customColors.green
    iconColor = darken(theme.palette.customColors.green, 0.2)
  } else if (isActive) {
    borderColor = theme.palette.primary.main
    iconColor = alpha(theme.palette.primary.main, 1)
  }

  return (
    <Tooltip title={step.title} placement="bottom">
      <Box
        component={Link}
        to={paths.learn.setup(courseId, step.id)}
        sx={{
          ...stepItemStyles,
          bgcolor: bgColor,
          border: `2px solid ${borderColor}`,
          '&:hover': {
            borderColor: isActive
              ? borderColor
              : isCompleted
                ? alpha(theme.palette.customColors.green, 0.25)
                : alpha(theme.palette.primary.main, 0.25),
          },
        }}
      >
        <Box
          component={Icon}
          sx={{
            fontSize: 20,
            color: iconColor,
          }}
        />
      </Box>
    </Tooltip>
  )
}
