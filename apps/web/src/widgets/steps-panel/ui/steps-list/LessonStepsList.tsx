import { Box } from '@mui/material'

import { type NavigationStep, StepItem, StepItemSkeleton } from '@/entities/course-navigation'
import { MotionBox } from '@/shared/ui/animations/motion'

import { panelStyles } from './LessonStepsList.styles'

interface LessonStepsListProps {
  courseId: string
  steps: NavigationStep[]
  currentStepId: string | undefined
  isExpanded: boolean
  isLoading: boolean
}

export const LessonStepsList = ({
  courseId,
  steps,
  currentStepId,
  isExpanded,
  isLoading,
}: LessonStepsListProps) => (
  <MotionBox
    initial={false}
    animate={{
      height: isExpanded ? 'auto' : 0,
    }}
    // transition={{
    //   height: isExpanded
    //     ? { type: 'spring', stiffness: 240, damping: 20, mass: 1.5 }
    //     : { ease: 'backIn', duration: 0.3 },
    // }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    sx={panelStyles.root}
  >
    <Box sx={panelStyles.content}>
      <Box sx={panelStyles.scrollContainer}>
        {isLoading
          ? [Array.from({ length: 6 }).map((_, i) => <StepItemSkeleton key={i} />)]
          : steps.map((step) => (
              <StepItem
                key={step.id}
                step={step}
                isActive={step.id === currentStepId}
                courseId={courseId}
              />
            ))}
      </Box>
    </Box>
  </MotionBox>
)
