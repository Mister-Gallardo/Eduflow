import { alpha, type SxProps, type Theme } from '@mui/material/styles'

export const catalogContainerStyles: SxProps<Theme> = {
  py: { xs: 10, md: 12 },
  position: 'relative',
  maxWidth: 1140,
  mx: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 4, md: 6 },
}

export const catalogFiltersStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'stretch', md: 'center' },
  gap: 3,
  py: { xs: 1.5, sm: 2 },
  px: { xs: 1.5, sm: 3 },
  borderRadius: 4,
  border: '1px solid',
  borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
  boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.05)}`,
}
