import { Box } from '@mui/material'

import type { NavigationStep } from '@/entities/course'
import { StepNavigationItem } from '@/entities/step'
import { MotionBox } from '@/shared/ui'

import { panelStyles } from './LessonStepsList.styles'

interface LessonStepsListProps {
  isExpanded: boolean
  steps: NavigationStep[]
  currentStepId: string | undefined
  courseId: string
}

export const LessonStepsList = ({
  isExpanded,
  steps,
  currentStepId,
  courseId,
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
        {steps.map((step) => (
          <StepNavigationItem
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
