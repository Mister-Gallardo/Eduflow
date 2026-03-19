import type { SxProps, Theme } from '@mui/material/styles'

export const dialogPaperStyles: SxProps<Theme> = {
  borderRadius: 4,
  maxWidth: 560,
  width: '100%',
  m: 2,
}

export const dialogTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: 20,
  px: 3,
  pt: 3,
  pb: 0,
}

export const dialogSubtitleStyles: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: 13,
  px: 3,
  pt: 0.5,
  pb: 0,
}

export const dialogContentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  px: 3,
  pt: 2.5,
  pb: 1,
}

export const rowFieldsStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  '& > *': { flex: 1 },
}

export const dialogActionsStyles: SxProps<Theme> = {
  px: 3,
  pb: 3,
  pt: 1.5,
  gap: 1.5,
}

export const fieldLabelStyles: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  color: 'text.secondary',
  mb: 0.75,
}
