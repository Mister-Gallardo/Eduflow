import type { SxProps, Theme } from '@mui/material/styles'

export const teachContainerStyles: SxProps<Theme> = {
  pt: { xs: 3, md: 4 },
  pb: { xs: 4, md: 6 },
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 3, md: 4 },
}

export const teachGridStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
    xl: 'repeat(4, 1fr)',
  },
  gap: 2.5,
}
