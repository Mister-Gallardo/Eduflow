import type { SxProps, Theme } from '@mui/material/styles'

export const pageContainerStyles: SxProps<Theme> = {
  width: '100%',
  mx: 'auto',
  px: {
    xs: 1.5,
    sm: 3,
  },
}

export const maxWidth = {
  fixed: { lg: '1140px', xl: '1440px' },
  fluid: '100%',
  narrow: '900px',
} as const
