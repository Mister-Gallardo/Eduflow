import { Box, TextField } from '@mui/material'

interface EditFreeTextStepProps {
  question: string
  minLength: string
  onQuestionChange: (value: string) => void
  onMinLengthChange: (value: string) => void
}

/**
 * Форма редактирования FreeTextStep.
 * Вопрос + опциональная минимальная длина ответа.
 */
export const EditFreeTextStep = ({
  question,
  minLength,
  onQuestionChange,
  onMinLengthChange,
}: EditFreeTextStepProps) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Вопрос / задание"
        fullWidth
        multiline
        minRows={3}
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="Опишите задание для студента..."
      />

      <TextField
        label="Минимальная длина ответа (необязательно)"
        type="number"
        fullWidth
        value={minLength}
        onChange={(e) => onMinLengthChange(e.target.value)}
        placeholder="0"
        helperText="Минимальное количество символов в ответе студента. Оставьте пустым для свободного ввода."
      />
    </Box>
  )
}
