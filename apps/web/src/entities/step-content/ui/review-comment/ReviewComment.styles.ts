import type { SxProps, Theme } from '@mui/material/styles'

export const reviewCommentContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 1.5,
  mt: 2.5,
  px: 2.5,
  py: 2,
  borderRadius: '12px',
  border: '1px solid',
  borderColor: (theme) => theme.palette.customColors.indigo,
  backgroundColor: (theme) => `${theme.palette.customColors.indigo}0A`,
  animation: 'fadeSlideIn 0.3s ease-out',
  '@keyframes fadeSlideIn': {
    from: { opacity: 0, transform: 'translateY(-8px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}

export const reviewCommentIconStyles: SxProps<Theme> = {
  fontSize: 20,
  mt: 0.25,
  color: (theme) => theme.palette.customColors.indigo,
  flexShrink: 0,
}

export const reviewCommentLabelStyles: SxProps<Theme> = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: (theme) => theme.palette.customColors.indigo,
  lineHeight: 1,
  mb: 0.5,
}

export const reviewCommentTextStyles: SxProps<Theme> = {
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.5,
  color: 'text.primary',
  whiteSpace: 'pre-line',
}
