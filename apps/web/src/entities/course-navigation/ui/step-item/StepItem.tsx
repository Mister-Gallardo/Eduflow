import { alpha, Box, darken, Tooltip, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

import type { NavigationStep } from '@/entities/course-navigation'
import { getStepIcon } from '@/entities/course-navigation/lib/get-step-icon'
import { paths } from '@/shared/config/paths'

import { stepItemStyles } from './StepItem.styles'

interface StepProps {
  step: NavigationStep
  isActive: boolean
  courseId: string
}

export const StepItem = ({ step, isActive, courseId }: StepProps) => {
  const theme = useTheme()

  const isCompleted = step.isCompleted
  const Icon = getStepIcon(step.type)

  let bgColor = alpha(theme.palette.primary.main, 0.06)
  const borderColor = isActive
    ? isCompleted
      ? theme.palette.customColors.green
      : theme.palette.primary.main
    : 'transparent'
  let iconColor = alpha(theme.palette.primary.main, 0.8)

  if (isCompleted) {
    bgColor = alpha(theme.palette.customColors.green, 0.18)
    iconColor = darken(theme.palette.customColors.green, 0.2)
  } else if (isActive) {
    iconColor = alpha(theme.palette.primary.main, 1)
  }

  return (
    <Tooltip
      title={step.title}
      slotProps={{ tooltip: { sx: { textAlign: 'center' } } }}
      placement="bottom"
    >
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
