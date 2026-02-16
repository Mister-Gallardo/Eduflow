import type { SxProps, Theme } from '@mui/material/styles'

export const mobileNavigationItemStyles: SxProps<Theme> = {
  py: 1.75,
  px: 2,
  mb: 0.5,
  borderRadius: 2,
  '&.Mui-selected': {
    backgroundColor: 'action.selected',
  },
}
