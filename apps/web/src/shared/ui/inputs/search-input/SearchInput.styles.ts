import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const searchInputStyles: SxProps<Theme> = {
  flex: { md: 1 },
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
    '& fieldset': {
      border: 'none',
    },
    '&:hover': {
      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
    },
    '&.Mui-focused': {
      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
    },
  },
  '& .MuiInputBase-input': {
    py: 1,
  },
}
