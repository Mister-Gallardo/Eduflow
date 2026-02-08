import type { SxProps, Theme } from '@mui/material'

export const courseCatalogStyles: SxProps<Theme> = {
  py: { xs: 10, md: 12 },
  position: 'relative',
  maxWidth: 1140,
  mx: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 4, md: 6 },
}

export const viewAllDesktopButtonStyles: SxProps<Theme> = {
  alignSelf: 'center',
  borderRadius: 4,
  px: 5,
  py: 1.5,
  borderWidth: '2px',
  fontWeight: 600,
  fontSize: 16,
}

export const courseListStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2.5,
  overflowX: 'auto',
  pb: 2,
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}

export const viewAllMobileButtonStyles: SxProps<Theme> = {
  flexShrink: 0,
  width: 160,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  scrollSnapAlign: 'start',
  py: 4,
}
