import type { SxProps, Theme } from '@mui/material/styles'

export const AuthorNavButtonStyles: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  p: 1.5,
  border: 'none',
  borderRadius: 999,
  bgcolor: 'primary.dark',
  color: '#fff',
  cursor: 'pointer',
  boxShadow: (theme) => `0px 4px 16px ${theme.palette.primary.dark}66`,
}
