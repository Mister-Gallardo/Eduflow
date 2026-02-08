import type { SxProps, Theme } from '@mui/material'

export const courseCardStyles: SxProps<Theme> = {
  borderRadius: '24px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: 'divider',
  cursor: 'pointer',
  position: 'relative',
}
export const headerStyles: SxProps<Theme> = {
  height: { xs: 140, sm: 160 },
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
}

export const firstCircleStyles: SxProps<Theme> = {
  position: 'absolute',
  top: '-20%',
  right: '-10%',
  width: '60%',
  height: '120%',
  borderRadius: '40%',
  background: 'rgba(255,255,255,0.12)',
  transform: 'rotate(15deg)',
  filter: 'blur(2px)',
}

export const secondCircleStyles: SxProps<Theme> = {
  position: 'absolute',
  bottom: '-30%',
  left: '-10%',
  width: '50%',
  height: '100%',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
}

export const categoryStyles: SxProps<Theme> = {
  position: 'absolute',
  right: 4,
  bottom: 0,
  width: { xs: '65%', sm: '70%', md: '75%' },
  height: 'auto',
  maxHeight: '92%',
  objectFit: 'contain',
  opacity: 1,
  zIndex: 1,
  pointerEvents: 'none',
  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
}

export const priceStyles: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: 12,
  px: 0.5,
  borderRadius: '12px',
}

export const titleStyles: SxProps<Theme> = {
  fontWeight: 700,
  mb: 1,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  lineHeight: 1.3,
  fontSize: 16,
}

export const descriptionStyles: SxProps<Theme> = {
  mb: 2,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  fontSize: 14,
  lineHeight: 1.6,
  opacity: 0.8,
}

export const footerStyles: SxProps<Theme> = {
  pt: 2,
  borderTop: `1px solid`,
  borderColor: `divider`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 2,
}

export const durationStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  px: 1.5,
  py: 0.5,
  borderRadius: '12px',
}
