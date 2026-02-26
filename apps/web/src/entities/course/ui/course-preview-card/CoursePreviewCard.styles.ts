import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const courseCardStyles: SxProps<Theme> = {
  borderRadius: '24px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: 'divider',
  cursor: 'pointer',
  position: 'relative',
  height: '100%',
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
  fontSize: 16,
}

export const descriptionStyles: SxProps<Theme> = {
  mb: 2,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  fontSize: 14,
  fontWeight: 400,
  color: (theme) => theme.palette.text.secondary,
}

export const footerStyles: SxProps<Theme> = {
  pt: 2,
  borderTop: `1px solid`,
  borderColor: `divider`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 2,
  marginTop: 'auto',
}

export const durationStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  px: 1.5,
  py: 0.5,
  borderRadius: '12px',
  color: (theme) => theme.palette.text.secondary,
  background: (theme) => alpha(theme.palette.divider, 0.05),
}
