import type { StepContent } from '@eduflow/shared'
import { Typography } from '@mui/material'

import { MatchingStep, TestStep, TextStep } from './step-types'

interface StepRendererProps {
  step: StepContent
  courseId: string
  stepId: string
  isCompleted?: boolean
  savedAnswer?: unknown
}

export const StepRenderer = ({
  step,
  courseId,
  stepId,
  isCompleted,
  savedAnswer,
}: StepRendererProps) => {
  switch (step.type) {
    case 'TEXT':
      return <TextStep content={step.content} />

    case 'TEST_SINGLE':
    case 'TEST_MULTIPLE':
      return (
        <TestStep
          content={step.content}
          testType={step.type}
          courseId={courseId}
          stepId={stepId}
          isCompleted={isCompleted}
          savedAnswer={savedAnswer as string[] | null | undefined}
        />
      )

    case 'MATCHING':
      return (
        <MatchingStep
          content={step.content}
          courseId={courseId}
          stepId={stepId}
          isCompleted={isCompleted}
          savedAnswer={savedAnswer as Record<string, string> | null | undefined}
        />
      )

    default:
      return (
        <Typography variant="h6" color="error">
          Тип контента &quot;{step.type}&quot; пока не поддерживается
        </Typography>
      )
  }
}
