import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const enrolledCardStyles: SxProps<Theme> = {
  borderRadius: '20px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  border: '1px solid',
  borderColor: 'divider',
  cursor: 'pointer',
  position: 'relative',
  height: '100%',
}

export const imageContainerStyles: SxProps<Theme> = {
  width: { xs: 140, sm: 200 },
  flexShrink: 0,
  borderRadius: 0,
}

export const contentStyles: SxProps<Theme> = {
  p: 2.5,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  background: 'common.white',
  minWidth: 0,
}

export const categoryChipStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 1,
  mb: 0.75,
}

export const statusChipStyles: SxProps<Theme> = {
  fontWeight: 500,
  fontSize: 11,
  borderRadius: '8px',
  p: 0.25,
  '& .MuiChip-icon': {
    color: 'inherit',
    fontSize: 14,
  },
}

export const titleStyles: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: { xs: 14, sm: 15 },
  mb: 0.5,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

export const progressBarContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  my: 1,
}

export const progressBarTrackStyles: SxProps<Theme> = {
  flex: 1,
  height: 6,
  borderRadius: 3,
  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
  overflow: 'hidden',
}

export const progressLineStyles: SxProps<Theme> = {
  width: '100%',
  height: 6,
  bgcolor: 'transparent',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    bgcolor: (theme) => theme.palette.customColors.green,
  },
}

export const footerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1,
  marginTop: 'auto',
  pt: 1,
}

export const footerMetaStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  color: 'text.secondary',
  fontSize: '0.75rem',
}

export const completedOverlayStyles: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'rgba(10, 142, 38, 0.5)',
  zIndex: 'layoutMedium',
}

export const actionButtonStyles: SxProps<Theme> = {
  ml: 'auto',
  px: 2,
  py: 0.75,
  fontSize: 11,
  fontWeight: 600,
  boxShadow: 'none',
  '& .MuiButton-endIcon > *:nth-of-type(1)': {
    fontSize: 14,
  },
  '&:hover': { boxShadow: 'none' },
}
