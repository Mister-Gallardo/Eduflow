import { Box, TextField } from '@mui/material'

interface EditVideoStepProps {
  url: string
  onChange: (value: string) => void
}

/**
 * Форма редактирования VideoStep.
 * Простое поле для ввода URL видео.
 */
export const EditVideoStep = ({ url, onChange }: EditVideoStepProps) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="URL видео"
        fullWidth
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://youtube.com/watch?v=..."
        helperText="Вставьте ссылку на видео (YouTube, Vimeo и т.д.)"
      />

      {url && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <Box
            component="iframe"
            src={url.replace('watch?v=', 'embed/')}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allowFullScreen
          />
        </Box>
      )}
    </Box>
  )
}
