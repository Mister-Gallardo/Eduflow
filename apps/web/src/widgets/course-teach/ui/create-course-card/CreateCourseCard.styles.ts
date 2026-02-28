import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const createCourseCardStyles: SxProps<Theme> = {
  minHeight: 280,
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: (theme) => `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: (theme) => theme.palette.primary.main,
    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
  },
}
