import { Box, TextField, Typography } from '@mui/material'

interface EditFillGapsStepProps {
  rawText: string
  gapCount: number
  onRawTextChange: (value: string) => void
}

/**
 * Форма создания/редактирования FillGapsStep для преподавателя.
 *
 * Преподаватель пишет текст, оборачивая правильные ответы в двойные фигурные скобки:
 *   `Столица Франции — {{Париж}}, а столица Германии — {{Берлин}}`
 *
 * Компонент показывает:
 * - Textarea для ввода текста
 * - Счётчик найденных пропусков
 * - Подсказку по синтаксису
 */
export const EditFillGapsStep = ({ rawText, gapCount, onRawTextChange }: EditFillGapsStepProps) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'text.disabled',
          px: 0.5,
        }}
      >
        Текст с пропусками
      </Typography>

      <TextField
        multiline
        minRows={4}
        maxRows={12}
        fullWidth
        value={rawText}
        onChange={(e) => onRawTextChange(e.target.value)}
        placeholder={'Столица Франции — {{Париж}}, а столица Германии — {{Берлин}}'}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            fontSize: 15,
            lineHeight: 1.6,
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 0.5,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.5,
            py: 0.5,
            borderRadius: '8px',
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: (theme) =>
              gapCount > 0
                ? theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.04)'
                : theme.palette.mode === 'dark'
                  ? 'rgba(255,100,100,0.1)'
                  : 'rgba(255,0,0,0.04)',
            color: gapCount > 0 ? 'primary.main' : 'error.main',
          }}
        >
          {gapCount > 0
            ? `${gapCount} ${gapCount === 1 ? 'пропуск' : gapCount < 5 ? 'пропуска' : 'пропусков'}`
            : 'Нет пропусков'}
        </Box>
      </Box>

      <Typography variant="caption" sx={{ color: 'text.disabled', mt: -1 }}>
        💡 Оберните правильные ответы в двойные фигурные скобки:{' '}
        <Box component="code" sx={{ fontSize: 'inherit', fontWeight: 600 }}>
          {'{{ответ}}'}
        </Box>
        . Студент увидит пустые поля вместо ответов.
      </Typography>
    </Box>
  )
}
