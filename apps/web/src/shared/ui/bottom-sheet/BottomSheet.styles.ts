import type { SxProps, Theme } from '@mui/material/styles'

export const bottomSheetStyles: SxProps<Theme> = {
  position: 'sticky',
  top: 0,
  zIndex: 'layoutHigh',
  width: '100%',
  py: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
