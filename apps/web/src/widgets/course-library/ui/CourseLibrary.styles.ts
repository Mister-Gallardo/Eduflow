import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const libraryContainerStyles: SxProps<Theme> = {
  pt: { xs: 3, md: 4 },
  pb: { xs: 4, md: 6 },
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 3, md: 4 },
}

export const libraryHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'flex-start', md: 'center' },
  justifyContent: 'space-between',
  gap: 3,
}

export const libraryFiltersStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'stretch', md: 'center' },
  gap: { xs: 2, md: 3 },
  py: 1.5,
  px: { xs: 2, sm: 2.5 },
  borderRadius: 4,
  border: '1px solid',
  borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
  boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.05)}`,
}
