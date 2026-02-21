import { alpha, type SxProps, type Theme } from '@mui/material/styles'

export const actionsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  mt: 4,
}

export const getResultBadgeStyles = (isCorrect: boolean): SxProps<Theme> => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  px: 2.5,
  py: 1.25,
  borderRadius: '10px',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
  backgroundColor: (theme) =>
    alpha(isCorrect ? theme.palette.customColors.green : theme.palette.customColors.red, 0.1),
  color: (theme) => (isCorrect ? theme.palette.customColors.green : theme.palette.customColors.red),
})

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
