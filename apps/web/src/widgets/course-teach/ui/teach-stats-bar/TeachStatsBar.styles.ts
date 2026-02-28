import type { SxProps, Theme } from '@mui/material/styles'

export const statCardStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 2,
  py: 1.5,
  borderRadius: 4,
  border: '1px solid',
  minWidth: 185,
  flex: { xs: 1, sm: 'auto' },
}

export const statCardIconStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  p: 0.75,
}
