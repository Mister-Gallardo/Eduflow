import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const courseTeachCardStyles: SxProps<Theme> = {
  borderRadius: '20px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: 'divider',
  cursor: 'pointer',
  height: '100%',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: (theme) => `0 16px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
  },
}

export const courseTeachCardTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: 15,
  mb: 1.5,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

export const courseTeachCardMetaStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  mb: 2,
  flexWrap: 'wrap',
  alignItems: 'center',
}

export const courseTeachCardFooterStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mt: 'auto',
}
