import type { SxProps, Theme } from '@mui/material/styles'

export const listContainerStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
  gap: 2.5,
}
