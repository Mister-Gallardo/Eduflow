import { Box, TextField, Typography } from '@mui/material'

import { textStepStyles } from '@/entities/step-content'

interface EditTextStepProps {
  html: string
  onChange: (value: string) => void
}

/**
 * Форма редактирования TextStep для преподавателя.
 * Простой textarea для ввода HTML с live preview.
 * TODO: При появлении rich-text редактора заменить textarea.
 */
export const EditTextStep = ({ html, onChange }: EditTextStepProps) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="HTML контент"
        multiline
        minRows={6}
        maxRows={20}
        fullWidth
        value={html}
        onChange={(e) => onChange(e.target.value)}
        placeholder="<p>Введите текст урока...</p>"
        helperText="Поддерживается HTML-разметка"
        slotProps={{ htmlInput: { style: { fontFamily: 'monospace', fontSize: 13 } } }}
      />

      {html && (
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'text.disabled',
              display: 'block',
              mb: 1,
            }}
          >
            Превью
          </Typography>
          <Box
            sx={[
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              textStepStyles as any,
              {
                p: 2,
                borderRadius: '12px',
                border: '1px dashed',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              },
            ]}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Box>
      )}
    </Box>
  )
}
