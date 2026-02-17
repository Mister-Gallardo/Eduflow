import type { SxProps, Theme } from '@mui/material/styles'

export const heroSectionStyles: SxProps<Theme> = {
  width: '100%',
  height: (theme) => ({ xs: 'auto', md: `calc(100vh - ${theme.layout.headerHeight.desktop}px)` }),
  minHeight: 700,
  maxHeight: { md: 1000 },
  pt: { xs: 5, md: 0 },
  pb: { xs: 10, md: 0 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: { xs: 6, md: 10 },
}
