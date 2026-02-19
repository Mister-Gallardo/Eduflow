import type { StepContent } from '@eduflow/shared'
import { Typography } from '@mui/material'

import { TextStep } from './step-types'

interface StepRendererProps {
  step: StepContent
}

export const StepRenderer = ({ step }: StepRendererProps) => {
  switch (step.type) {
    case 'TEXT':
      return <TextStep content={step.content} />
    default:
      return (
        <Typography variant="h6" color="error">
          Тип контента "{step.type}" пока не поддерживается
        </Typography>
      )
  }
}
