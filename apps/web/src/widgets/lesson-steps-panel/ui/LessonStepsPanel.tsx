import { Box } from '@mui/material'
import { useState } from 'react'

import type { NavigationLesson } from '@/entities/course'

import { LessonStepsList } from './lesson-steps-list'
import { PanelChevron } from './panel-chevron'

interface LessonStepsPanelProps {
  lesson: NavigationLesson | undefined
  currentStepId: string | undefined
  courseId: string
}

export const LessonStepsPanel = ({ lesson, currentStepId, courseId }: LessonStepsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!lesson) return null

  const steps = lesson.steps

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 'layoutHigh',
      }}
    >
      <LessonStepsList
        isExpanded={isExpanded}
        steps={steps}
        currentStepId={currentStepId}
        courseId={courseId}
      />

      <PanelChevron isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
    </Box>
  )
}
