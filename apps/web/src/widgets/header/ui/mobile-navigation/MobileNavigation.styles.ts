import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const mobileNavigationItemStyles: SxProps<Theme> = {
  py: 1.5,
  px: 2,
  mb: 0.5,
  borderRadius: 2,
  '&.Mui-selected': {
    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
  },
}
