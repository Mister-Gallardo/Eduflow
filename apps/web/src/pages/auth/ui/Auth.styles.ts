import type { SxProps, Theme } from '@mui/material'

export const paperStyles: SxProps<Theme> = {
  p: 4,
  pt: 3,
  borderRadius: 3,
  border: '1px solid #E5E7EB',
  backgroundColor: '#fff',
}

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
