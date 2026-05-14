import { alpha, type SxProps, type Theme } from '@mui/material/styles'

export const fillGapsContainerStyles: SxProps<Theme> = {
  fontSize: 15,
  lineHeight: 2.4,
  wordBreak: 'break-word',
}

export const getGapInputStyles = (isChecked: boolean, isCorrect?: boolean): SxProps<Theme> => ({
  display: 'inline-flex',
  verticalAlign: 'baseline',
  mx: 0.5,

  '& .MuiInputBase-root': {
    fontSize: 14,
    fontWeight: 500,
    borderRadius: '8px',
    minWidth: 80,
    maxWidth: 200,
    transition: 'all 0.2s',

    backgroundColor: (theme) => {
      if (isChecked) {
        if (isCorrect === true) return alpha(theme.palette.customColors.green, 0.06)
        if (isCorrect === false) return alpha(theme.palette.customColors.red, 0.06)
      }
      return alpha(theme.palette.primary.main, 0.03)
    },
  },

  '& .MuiInputBase-input': {
    py: 0.5,
    px: 1.5,
    textAlign: 'center',
  },

  '& .MuiOutlinedInput-notchedOutline': {
    transition: 'border-color 0.2s',
    borderColor: (theme) => {
      if (isChecked) {
        if (isCorrect === true) return theme.palette.customColors.green
        if (isCorrect === false) return theme.palette.customColors.red
      }
      return alpha(theme.palette.primary.main, 0.2)
    },
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme) => {
      if (isChecked) {
        if (isCorrect === true) return theme.palette.customColors.green
        if (isCorrect === false) return theme.palette.customColors.red
        return 'rgba(0, 0, 0, 0.23)'
      }
      return theme.palette.primary.main
    },
  },

  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme) => {
      if (isChecked) {
        if (isCorrect === true) return theme.palette.customColors.green
        if (isCorrect === false) return theme.palette.customColors.red
      }
      return theme.palette.primary.main
    },
  },
})
