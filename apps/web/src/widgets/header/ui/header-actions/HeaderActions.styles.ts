import type { SxProps, Theme } from '@mui/material/styles'

export const headerActionsStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
}

export const actionButtonStyles: SxProps<Theme> = {
  color: 'text.primary',
  padding: 1,
  transition: 'all 0.2s ease-in-out',
  '& svg': {
    fontSize: 26,
  },
}
