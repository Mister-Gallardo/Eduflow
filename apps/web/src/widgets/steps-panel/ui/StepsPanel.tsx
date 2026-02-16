import { Box } from '@mui/material'
import { useState } from 'react'

import type { NavigationLesson } from '@/entities/course-navigation'

import { PanelChevron } from './panel-chevron'
import { LessonStepsList } from './steps-list'

interface LessonStepsPanelProps {
  lesson: NavigationLesson | null
  currentStepId: string | undefined
  courseId: string
  isLoading: boolean
}

export const StepsPanel = ({
  lesson,
  currentStepId,
  courseId,
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
        isExpanded={isExpanded}
        steps={steps}
        currentStepId={currentStepId}
        courseId={courseId}
        isLoading={isLoading}
      />

      <PanelChevron isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
    </Box>
  )
}
