import type { InputNumberContent, InputTextContent } from '@eduflow/shared'
import { Box, TextField, Typography } from '@mui/material'

import { stepQuestionStyles } from '@/shared/ui/styles/typography'

import { getInputStyles } from '../../../lib/utils'

export type InputContent = InputTextContent | InputNumberContent

export interface InputStepProps {
  content: InputContent
  stepType: 'INPUT_TEXT' | 'INPUT_NUMBER'
  value: string
  isChecked: boolean
  isCorrect?: boolean
  onChange: (value: string) => void
}

export const InputStep = ({
  content,
  stepType,
  value,
  isChecked,
  isCorrect,
  onChange,
}: InputStepProps) => {
  const isNumber = stepType === 'INPUT_NUMBER'

  return (
    <Box>
      <Typography sx={stepQuestionStyles}>{content.question}</Typography>

      <TextField
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isChecked}
        placeholder={isNumber ? 'Введите число...' : 'Введите ваш ответ...'}
        type={isNumber ? 'number' : 'text'}
        sx={getInputStyles({ isChecked, isCorrect })}
      />
    </Box>
  )
}
