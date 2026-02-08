import type { SxProps, Theme } from '@mui/material'

export const alertStyles: SxProps<Theme> = {
  borderRadius: 2,
  color: 'error.main',
  textAlign: 'center',
  '& .MuiAlert-message': {
    width: '100%',
  },
}
