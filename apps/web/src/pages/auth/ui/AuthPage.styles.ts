import type { SxProps, Theme } from '@mui/material/styles'

export const paperStyles: SxProps<Theme> = {
  p: 4,
  pt: 3,
  borderRadius: 3,
  border: '1px solid #E5E7EB',
  backgroundColor: (theme) => theme.palette.common.white,
}
