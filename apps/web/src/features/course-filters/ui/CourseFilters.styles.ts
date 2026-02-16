import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const courseFiltersStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'stretch', md: 'center' },
  gap: 3,
  py: { xs: 1.5, sm: 2 },
  px: { xs: 1.5, sm: 3 },
  borderRadius: 5,
  border: '1px solid',
  borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
  boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.05)}`,
}
