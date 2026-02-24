import { darken, type SxProps, type Theme } from '@mui/material/styles'

export const actionsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  mt: 4,
}

export const submitButtonStyles: SxProps<Theme> = {
  px: 4,
  py: 1,
  bgcolor: (theme) => theme.palette.customColors.indigo,
  '&:hover': {
    bgcolor: (theme) => darken(theme.palette.customColors.indigo, 0.1),
  },
}

export const retryButtonStyles: SxProps<Theme> = {
  p: 1,
  border: '1px solid',
  borderColor: 'primary.main',
  color: 'primary.main',
  '&:hover': {
    borderColor: 'primary.dark',
    color: 'primary.dark',
  },
}
