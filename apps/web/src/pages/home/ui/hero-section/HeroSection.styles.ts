import type { SxProps, Theme } from '@mui/material/styles'

export const heroSectionStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  columnGap: 2,
  rowGap: 6,
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const promoBadgeStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1.5,
  mx: { xs: 'auto', md: 0 },
  px: 2,
  py: 1,
  borderRadius: 999,
  border: 1,
  borderColor: 'secondary.main',
  backdropFilter: 'blur(8px)',
}

export const titleStyles: SxProps<Theme> = {
  fontSize: { xs: 40, md: 44, lg: 54 },
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  mb: 2,
  color: 'primary.main',
}

export const imageContainerStyles: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 5,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  backgroundColor: 'white',
}

export const imageStyles: SxProps<Theme> = {
  position: 'relative',
  display: 'block',
  zIndex: 'layoutMedium',
  width: '100%',
  height: 'auto',
  aspectRatio: '500 / 367.56',
}
