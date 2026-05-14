import type { FillGapsContent } from '@eduflow/shared'
import { Box, TextField, Typography } from '@mui/material'

import { fillGapsContainerStyles, getGapInputStyles } from './FillGapsStep.styles'

export interface FillGapsStepProps {
  content: FillGapsContent
  /** Текущие ответы юзера: gapId → value */
  answers: Record<string, string>
  isChecked: boolean
  /** Общий результат проверки */
  isCorrect?: boolean
  onAnswerChange: (gapId: string, value: string) => void
}

/**
 * Парсит текст с маркерами `{{gap-id}}` и возвращает массив сегментов.
 */
const parseSegments = (text: string): { type: 'text' | 'gap'; value: string }[] => {
  const segments: { type: 'text' | 'gap'; value: string }[] = []
  const regex = /\{\{(gap-\d+)\}\}/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }
    segments.push({ type: 'gap', value: match[1] })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return segments
}

export const FillGapsStep = ({
  content,
  answers,
  isChecked,
  isCorrect,
  onAnswerChange,
}: FillGapsStepProps) => {
  const segments = parseSegments(content.text)

  return (
    <Box sx={fillGapsContainerStyles}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return (
            <Typography
              key={index}
              component="span"
              sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}
            >
              {segment.value}
            </Typography>
          )
        }

        const gapId = segment.value
        const gap = content.gaps.find((g) => g.id === gapId)
        if (!gap) return null

        return (
          <Box key={gapId} component="span" sx={getGapInputStyles(isChecked, isCorrect)}>
            <TextField
              size="small"
              variant="outlined"
              value={answers[gapId] ?? ''}
              onChange={(e) => onAnswerChange(gapId, e.target.value)}
              disabled={isChecked}
              placeholder="..."
            />
          </Box>
        )
      })}
    </Box>
  )
}
