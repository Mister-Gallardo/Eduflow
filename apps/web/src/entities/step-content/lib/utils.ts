import { alpha, type SxProps, type Theme } from '@mui/material/styles'

const INDICATOR_SIZE = 32

interface IndicatorStylesParams {
  isSelected: boolean
  isChecked: boolean
  isCorrect?: boolean
  variant: 'circle' | 'square'
}

interface OptionStylesParams {
  isSelected: boolean
  isChecked: boolean
  isCorrect?: boolean
}

export const getOptionStyles = ({
  isSelected,
  isChecked,
  isCorrect,
}: OptionStylesParams): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  px: 2,
  py: 1.25,
  borderRadius: '12px',
  cursor: isChecked ? 'default' : 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s',
  border: '2px solid',

  borderColor: (theme) => {
    if (isChecked) {
      if (isCorrect === true) return theme.palette.customColors.green
      if (isCorrect === false) return theme.palette.customColors.red
      return alpha(theme.palette.primary.main, 0.08)
    }
    return isSelected ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.08)
  },

  backgroundColor: (theme) => {
    if (isChecked) {
      if (isCorrect === true) return alpha(theme.palette.customColors.green, 0.04)
      if (isCorrect === false) return alpha(theme.palette.customColors.red, 0.03)
      return 'transparent'
    }
    return isSelected ? alpha(theme.palette.primary.main, 0.03) : 'transparent'
  },

  boxShadow: (theme) => {
    if (isChecked && isCorrect === true)
      return `0 2px 12px ${alpha(theme.palette.customColors.green, 0.12)}`
    if (isSelected && !isChecked) return `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`
    return 'none'
  },

  '&:hover': isChecked
    ? {}
    : {
        borderColor: (theme: Theme) =>
          isSelected ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.2),
        backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.02),
      },
})

export const getIndicatorStyles = ({
  isSelected,
  isChecked,
  isCorrect,
  variant,
}: IndicatorStylesParams): SxProps<Theme> => ({
  width: INDICATOR_SIZE,
  height: INDICATOR_SIZE,
  minWidth: INDICATOR_SIZE,
  borderRadius: variant === 'circle' ? '50%' : '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 600,
  transition: 'all 0.2s',
  border: '2px solid',

  borderColor: (theme) => {
    if (isChecked) {
      if (isCorrect === true) return theme.palette.customColors.green
      if (isCorrect === false) return theme.palette.customColors.red
      return alpha(theme.palette.primary.main, 0.15)
    }
    return isSelected ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.2)
  },

  backgroundColor: (theme) => {
    if (isChecked) {
      if (isCorrect === true) return theme.palette.customColors.green
      if (isCorrect === false) return theme.palette.customColors.red
      return 'transparent'
    }
    return isSelected ? theme.palette.primary.main : 'transparent'
  },

  color: (theme) => {
    if (isChecked) {
      if (isCorrect === true || isCorrect === false) return theme.palette.common.white
      return alpha(theme.palette.primary.main, 0.35)
    }
    return isSelected ? theme.palette.common.white : alpha(theme.palette.primary.main, 0.45)
  },
})
