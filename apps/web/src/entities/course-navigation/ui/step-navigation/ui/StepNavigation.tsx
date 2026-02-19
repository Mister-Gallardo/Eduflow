import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { paths } from '@/shared/config/paths'

import { stepNavigationButtonStyles, stepNavigationStyles } from './StepNavigation.styles'

interface StepNavigationProps {
  prevStepId: string | null
  nextStepId: string | null
  courseId: string
}

export const StepNavigation = ({ prevStepId, nextStepId, courseId }: StepNavigationProps) => {
  const navigate = useNavigate()

  const handleNavigate = (stepId: string) => {
    void navigate(paths.learn.setup(courseId, stepId))
  }

  return (
    <Box sx={stepNavigationStyles}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        disabled={!prevStepId}
        onClick={() => prevStepId && handleNavigate(prevStepId)}
        sx={stepNavigationButtonStyles}
      >
        Назад
      </Button>

      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        disabled={!nextStepId}
        onClick={() => nextStepId && handleNavigate(nextStepId)}
        sx={stepNavigationButtonStyles}
      >
        Далее
      </Button>
    </Box>
  )
}
