import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'

interface EditInputTextStepProps {
  question: string
  correctAnswers: string[]
  onQuestionChange: (value: string) => void
  onAddAnswer: () => void
  onRemoveAnswer: (index: number) => void
  onUpdateAnswer: (index: number, value: string) => void
}

/**
 * Форма редактирования InputTextStep.
 * Вопрос + список допустимых правильных ответов.
 */
export const EditInputTextStep = ({
  question,
  correctAnswers,
  onQuestionChange,
  onAddAnswer,
  onRemoveAnswer,
  onUpdateAnswer,
}: EditInputTextStepProps) => {
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

      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'text.disabled',
            display: 'block',
            mb: 1.5,
          }}
        >
          Правильные ответы
          <Typography
            component="span"
            sx={{ ml: 1, fontSize: 11, fontWeight: 400, color: 'text.disabled' }}
          >
            (регистр не учитывается)
          </Typography>
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <AnimatePresence initial={false}>
            {correctAnswers.map((answer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.15 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={answer}
                    onChange={(e) => onUpdateAnswer(index, e.target.value)}
                    placeholder={`Ответ ${index + 1}`}
                  />
                  <Tooltip title="Удалить ответ">
                    <span>
                      <IconButton
                        size="small"
                        onClick={() => onRemoveAnswer(index)}
                        disabled={correctAnswers.length <= 1}
                        sx={{ flexShrink: 0, color: 'text.disabled' }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        <Box
          component="button"
          onClick={onAddAnswer}
          sx={{
            mt: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.5,
            py: 0.75,
            border: '1px dashed',
            borderColor: (theme) => `${theme.palette.primary.main}50`,
            borderRadius: '8px',
            background: 'none',
            cursor: 'pointer',
            color: 'primary.main',
            fontSize: 13,
            fontWeight: 500,
            transition: 'all 0.15s',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
            },
          }}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          Добавить ответ
        </Box>
      </Box>
    </Box>
  )
}
