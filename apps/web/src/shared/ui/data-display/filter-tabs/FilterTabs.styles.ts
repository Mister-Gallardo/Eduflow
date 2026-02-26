import type { SxProps, Theme } from '@mui/material/styles'

export const filterTabsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1,
  overflowX: 'auto',
  borderRadius: 3,
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}

export const filterTabButtonStyles: SxProps<Theme> = {
  position: 'relative',
  px: { xs: 2, sm: 2.5 },
  py: 1,
  borderRadius: 3,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  transition: 'color 0.2s ease',
  zIndex: 'layoutLow',
}
