import type { SxProps, Theme } from '@mui/material/styles'

export const gridBackgroundStyles: Record<'root' | 'image', SxProps<Theme>> = {
  root: {
    position: 'absolute',
    top: { xs: 56, md: 60 },
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 'background',
    overflow: 'hidden',
    pointerEvents: 'none',
  },

  image: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
        `,
    backgroundSize: '80px 80px',
    maskImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0) 80%)',
    WebkitMaskImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0) 80%)',
  },
}
