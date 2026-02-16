import { alpha, type SxProps, type Theme } from '@mui/material/styles'

export const sidebarContentListStyles: SxProps<Theme> = {
  flex: 1,
  minHeight: 0,
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparrent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.1),
    borderRadius: 999,
    '&:hover': {
      backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.2),
    },
  },
}
