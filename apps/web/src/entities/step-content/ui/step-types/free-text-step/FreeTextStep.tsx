import type { FreeTextContent, StepStatus } from '@eduflow/shared'
import { Box, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

import { stepQuestionStyles } from '@/shared/ui/styles/typography'

import { getFreeTextStyles } from '../../../lib/utils'

import { freeTextFooterStyles } from './FreeTextStep.styles'

export interface FreeTextStepProps {
  content: FreeTextContent
  value: string
  isSubmitted: boolean
  status?: StepStatus
  onChange: (value: string) => void
}

export const FreeTextStep = ({
  content,
  isSubmitted,
  value,
  status,
  onChange,
}: FreeTextStepProps) => {
  const minLength = content.minLength ?? 0
  const charCount = value.trim().length
  const isTooShort = minLength > 0 && charCount < minLength && charCount > 0

  return (
    <Box>
      <Typography sx={stepQuestionStyles}>{content.question}</Typography>

      <TextField
        multiline
        fullWidth
        minRows={6}
        maxRows={12}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isSubmitted}
        placeholder="Напишите развёрнутый ответ..."
        sx={getFreeTextStyles({ status })}
      />

      <Box sx={freeTextFooterStyles}>
        {minLength > 0 && (
          <Typography
            variant="caption"
            sx={{
              color: isTooShort
                ? (theme) => theme.palette.customColors.red
                : (theme) => alpha(theme.palette.text.secondary, 0.7),
              transition: 'color 0.2s',
            }}
          >
            Минимум {minLength} символов
          </Typography>
        )}

        <Typography
          variant="caption"
          sx={{
            ml: 'auto',
            color: isTooShort
              ? (theme) => theme.palette.customColors.red
              : (theme) => alpha(theme.palette.text.secondary, 0.5),
            transition: 'color 0.2s',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {charCount}
          {minLength > 0 && ` / ${minLength}`}
        </Typography>
      </Box>
    </Box>
  )
}
