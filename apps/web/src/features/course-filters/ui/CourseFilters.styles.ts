import type { SxProps, Theme } from '@mui/material'

export const categoryTabsStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1,
  px: 1.5,
  mx: -1.5,
  overflowX: 'auto',
  borderRadius: 3,
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}

export const categoryTabStyles: SxProps<Theme> = {
  position: 'relative',
  px: { xs: 2, sm: 2.5 },
  py: 1,
  borderRadius: 3,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  transition: 'color 0.2s ease',
  zIndex: 1,
}

export const courseFiltersStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'stretch', md: 'center' },
  gap: 3,
  py: { xs: 1.5, sm: 2 },
  px: { xs: 1.5, sm: 3 },
  borderRadius: 5,
  border: '1px solid',
}
