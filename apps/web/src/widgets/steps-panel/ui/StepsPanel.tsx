import { Box } from '@mui/material'
import { useState } from 'react'

import type { NavigationLesson } from '@/entities/course-navigation'

import { PanelChevron } from './panel-chevron'
import { LessonStepsList } from './steps-list'

interface LessonStepsPanelProps {
  courseId: string
  lesson: NavigationLesson | null
  currentStepId: string | undefined
  isLoading: boolean
}

export const StepsPanel = ({
  courseId,
  lesson,
  currentStepId,
  isLoading,
}: LessonStepsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!lesson && !isLoading) return null

  const steps = lesson?.steps ?? []

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 'layoutHigh',
      }}
    >
      <LessonStepsList
        courseId={courseId}
        steps={steps}
        currentStepId={currentStepId}
        isExpanded={isExpanded}
        isLoading={isLoading}
      />

      <PanelChevron isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
    </Box>
  )
}
