import type { SxProps, Theme } from '@mui/material/styles'

export const stepNavigationStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  mt: 4,
  pt: 3,
  borderTop: '1px solid',
  borderColor: 'divider',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
}
