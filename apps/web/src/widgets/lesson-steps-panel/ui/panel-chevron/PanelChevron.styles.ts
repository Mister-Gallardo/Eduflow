import type { SxProps, Theme } from '@mui/material/styles'

export const chevronStyles: SxProps<Theme> = {
  position: 'absolute',
  top: '100%',
  right: 24,
  zIndex: 'layoutHigh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 22,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  border: (theme) => `1px solid ${theme.palette.divider}`,
  borderTop: 'none',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  transform: 'translateY(-1px)',
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
}
