import type { SxProps, Theme } from '@mui/material/styles'

export const result404Styles: SxProps<Theme> = {
  height: (theme) => ({
    xs: `calc(100dvh - ${theme.layout.headerHeight.mobile}px)`,
    md: `calc(100vh - ${theme.layout.headerHeight.desktop}px)`,
  }),
  minHeight: 500,
  maxHeight: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  px: {
    xs: 1.5,
    sm: 3,
  },
}
