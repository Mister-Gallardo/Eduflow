import type { SxProps, Theme } from '@mui/material/styles'

export const statsBarContainerStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
}

export const statCardStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 2,
  py: 1,
  borderRadius: 4,
  border: '1px solid',
}
