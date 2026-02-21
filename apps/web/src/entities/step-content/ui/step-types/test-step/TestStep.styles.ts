import type { SxProps, Theme } from '@mui/material/styles'

export const questionStyles: SxProps<Theme> = {
  fontSize: 16,
  fontWeight: 500,
  mb: 2,
}

export const optionsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
}

export const optionTextStyles: SxProps<Theme> = {
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.5,
}
