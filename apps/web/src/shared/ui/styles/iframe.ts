import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const iframeStyles: SxProps<Theme> = {
  width: '100%',
  aspectRatio: '16 / 9',
  borderRadius: '12px',
  border: 'none',
  boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
}
