import type { SxProps, Theme } from '@mui/material'

export const sectionStyles: SxProps<Theme> = {
  width: '100%',
  height: { xs: 'auto', md: 'calc(100vh - 60px)' },
  minHeight: 700,
  maxHeight: { md: 1000 },
  pt: { xs: 5, md: 0 },
  pb: { xs: 10, md: 0 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: { xs: 6, md: 10 },
}

export const statsStyles: SxProps<Theme> = {
  mx: 'auto',
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(2, 1fr)',
    md: 'repeat(4, auto)',
  },

  gap: { xs: 3, sm: 6, md: 8 },
  justifyContent: 'center',
  alignItems: 'center',
}

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

export const imageStyles: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 5,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  backgroundColor: 'white',
}

export const iconStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: { xs: 46, sm: 56 },
  height: { xs: 46, sm: 56 },
  borderRadius: '16px',
}
