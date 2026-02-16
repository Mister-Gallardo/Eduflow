import type { SxProps, Theme } from '@mui/material/styles'

export const stepItemStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: 2,
  transition: 'all 0.2s',
  cursor: 'pointer',
  flexShrink: 0,
  position: 'relative',
}
