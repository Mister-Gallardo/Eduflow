import type { SxProps, Theme } from '@mui/material'

export const checkboxStyles: SxProps<Theme> = {
  alignSelf: 'flex-start',
  transition: '0.2s',
  '&:hover': {
    backgroundColor: 'transparent',
    color: 'primary.main',
    transition: '0.2s',
  },
  '&.Mui-checked': {
    color: 'primary.main',
  },
}
