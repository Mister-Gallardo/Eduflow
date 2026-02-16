import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const panelStyles: Record<'root' | 'content' | 'scrollContainer', SxProps<Theme>> = {
  root: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    px: { xs: 1.5, sm: 3 },
    pt: 0.75,
    gap: 1.5,

    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
  },

  scrollContainer: {
    display: 'flex',
    gap: 1,
    pb: 0.75,
    flex: 1,
    overflowX: 'auto',

    '&::-webkit-scrollbar': {
      height: 4,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 999,
      backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.1),

      '&:hover': {
        backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.2),
      },
    },
  },
}
