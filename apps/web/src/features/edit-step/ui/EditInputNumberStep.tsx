import { Box, TextField } from '@mui/material'

interface EditInputNumberStepProps {
  question: string
  correctAnswer: string
  onQuestionChange: (value: string) => void
  onAnswerChange: (value: string) => void
}

/**
 * Форма редактирования InputNumberStep.
 * Вопрос + правильный числовой ответ.
 */
export const EditInputNumberStep = ({
  question,
  correctAnswer,
  onQuestionChange,
  onAnswerChange,
}: EditInputNumberStepProps) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Вопрос"
        fullWidth
        multiline
        minRows={2}
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="Введите вопрос..."
      />

      <TextField
        label="Правильный ответ"
        type="number"
        fullWidth
        value={correctAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Введите число"
        helperText="Студент должен ввести это число"
      />
    </Box>
  )
}
