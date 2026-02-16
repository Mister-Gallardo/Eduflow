import type { SxProps, Theme } from '@mui/material/styles'

export const emptyStateStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  py: { xs: 6, md: 10 },
  textAlign: 'center',
}
