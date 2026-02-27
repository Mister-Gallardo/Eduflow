import type { SxProps, Theme } from '@mui/material/styles'

export const bottomSheetStyles: SxProps<Theme> = {
  position: 'sticky',
  top: 0,
  zIndex: 'layoutHigh',
  backgroundColor: (theme) => theme.palette.common.white,
  width: '100%',
  pt: 1.5,
  pb: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
