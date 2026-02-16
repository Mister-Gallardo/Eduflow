import type { SxProps, Theme } from '@mui/material/styles'

export const courseCatalogStyles: SxProps<Theme> = {
  py: { xs: 10, md: 12 },
  position: 'relative',
  maxWidth: 1140,
  mx: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 4, md: 6 },
}
