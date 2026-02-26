import type { SxProps, Theme } from '@mui/material/styles'

export const mobileListContainerStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2.5,
  overflowX: 'auto',
  pb: 2,
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}

export const desktopListContainerStyles: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  gap: { xs: 4, md: 6 },
  flexDirection: 'column',
  justifyContent: 'center',
}

export const viewAllMobileContainerStyles: SxProps<Theme> = {
  width: 160,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  scrollSnapAlign: 'start',
  py: 4,
}

export const viewAllMobileButtonStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  p: 1,
  borderRadius: 2,
  transition: 'transform 0.2s ease',
}

export const viewAllMobileIconStyles: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  bgcolor: (theme) => theme.palette.primary.main,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const viewAllDesktopButtonStyles: SxProps<Theme> = {
  px: 5,
  py: 1.5,
  alignSelf: 'center',
  borderRadius: 4,
  borderWidth: '2px',
  fontWeight: 600,
  fontSize: 16,
}
