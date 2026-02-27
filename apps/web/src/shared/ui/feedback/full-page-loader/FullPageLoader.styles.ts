import type { SxProps, Theme } from '@mui/material/styles'

export const fullPageLoaderStyles: SxProps<Theme> = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100dvh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  zIndex: 'layoutHigh',

  animation: 'fadeIn 0.3s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}
