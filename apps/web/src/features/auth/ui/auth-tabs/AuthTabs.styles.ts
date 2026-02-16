import type { SxProps, Theme } from '@mui/material/styles'

export const tabStyles: SxProps<Theme> = {
  color: 'text.secondary',
  '&.Mui-selected': {
    color: 'text.primary',
  },
  transition: 'color 0.2s',
  '&:hover': {
    color: 'text.primary',
  },
}
