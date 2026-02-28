import { alpha, darken, type SxProps, type Theme } from '@mui/material/styles'

export const teachTabsStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 0.5,
  position: 'relative',
  boxShadow: (theme) => `inset 0 -1px 0 0 ${theme.palette.divider}`,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}

export const teachTabStyles: SxProps<Theme> = {
  position: 'relative',
  minWidth: 'fit-content',
  borderRadius: 0,
  px: 3,
  py: 1.5,
  minHeight: 48,
  transition: 'all 0.2s',
  '&:hover': {
    bgcolor: 'transparent',
    color: 'text.primary',
  },
}

export const teachTabUnderlineStyles: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 2,
  bgcolor: 'primary.main',
  borderRadius: 1,
}

export const teachTabLabelStyles: SxProps<Theme> = {
  fontWeight: 'inherit',
  fontSize: { xs: '0.8rem', sm: '0.875rem' },
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  position: 'relative',
  zIndex: 1,
}

export const teachTabChipStyles: SxProps<Theme> = {
  ml: 1,
  height: 20,
  minWidth: 20,
  fontSize: '0.7rem',
  fontWeight: 700,
  bgcolor: (theme) => alpha(theme.palette.customColors.orange, 0.15),
  color: (theme) => darken(theme.palette.customColors.orange, 0.1),
}
