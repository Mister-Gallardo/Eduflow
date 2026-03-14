import type { StepStatus } from '@eduflow/shared'
import { alpha, darken, type SxProps, type Theme } from '@mui/material/styles'

import { INDICATOR_SIZE, ROW_MIN_HEIGHT } from './constants'

interface IndicatorStylesParams {
  isSelected: boolean
  isChecked: boolean
  isCorrect?: boolean
  variant: 'circle' | 'square'
}

interface BaseOptionStylesParams {
  isChecked: boolean
  isCorrect?: boolean
  isActive?: boolean
  isSubtle?: boolean
}

interface OptionStylesParams {
  isSelected: boolean
  isChecked: boolean
  isCorrect?: boolean
}

interface InputStylesParams {
  isChecked: boolean
  isCorrect?: boolean
}

/** Возвращает базовый цвет (зеленый/красный) в зависимости от правильности ответа */
const getCorrectnessColor = (theme: Theme, isCorrect?: boolean) => {
  if (isCorrect === true) return theme.palette.customColors.green
  if (isCorrect === false) return theme.palette.customColors.red
  return null
}

/** Возвращает цвет на основе статуса шага (для Free Text и Badge) */
const getStatusColor = (theme: Theme, status?: StepStatus) => {
  if (status === 'APPROVED') return theme.palette.customColors.green
  if (status === 'FAILED') return theme.palette.customColors.red
  if (status === 'PENDING') return theme.palette.customColors.orange
  return null
}

export interface FreeTextStylesParams {
  status?: StepStatus
}

// ─── Стили компонентов ───

export const getBaseOptionStyles = ({
  isChecked,
  isCorrect,
  isActive = false,
  isSubtle = false,
}: BaseOptionStylesParams): SxProps<Theme> => ({
  alignItems: 'center',
  minHeight: ROW_MIN_HEIGHT,
  height: '100%',
  gap: 2,
  px: 2,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.4,
  cursor: isChecked ? 'default' : 'pointer',
  userSelect: 'none',
  border: '1px solid',
  borderRadius: '12px',
  transition: 'background-color 0.2s, border-color 0.2s, box-shadow 0.2s',

  borderColor: (theme) => {
    if (isChecked) {
      const color = getCorrectnessColor(theme, isCorrect)
      return color ?? 'rgba(0, 0, 0, 0.23)'
    }
    if (isSubtle) return alpha(theme.palette.primary.main, 0.2)
    return isActive ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.23)'
  },

  backgroundColor: (theme) => {
    if (isChecked) {
      const color = getCorrectnessColor(theme, isCorrect)
      return color ? alpha(color, 0.06) : 'transparent'
    }
    if (isSubtle) return 'transparent'
    return isActive ? alpha(theme.palette.primary.main, 0.03) : 'transparent'
  },

  boxShadow: (theme) => {
    if (isChecked && isCorrect === true) {
      return `0 2px 12px ${alpha(theme.palette.customColors.green, 0.12)}`
    }
    if (!isChecked && !isSubtle) {
      if (isActive) return `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`
      return `0 2px 6px ${alpha(theme.palette.primary.main, 0.1)}`
    }
    return 'none'
  },

  '&:hover': isChecked
    ? {}
    : {
        borderColor: (theme: Theme) => {
          if (isSubtle) return alpha(theme.palette.primary.main, 0.4)
          return isActive ? theme.palette.primary.main : theme.palette.primary.dark
        },
        backgroundColor: (theme: Theme) => {
          return isSubtle
            ? alpha(theme.palette.primary.main, 0.04)
            : alpha(theme.palette.primary.main, 0.06)
        },
      },
})

export const getOptionStyles = ({
  isSelected,
  isChecked,
  isCorrect,
}: OptionStylesParams): SxProps<Theme> => ({
  ...getBaseOptionStyles({ isChecked, isCorrect, isActive: isSelected }),
  display: 'flex',

  boxShadow: (theme) => {
    if (isChecked && isCorrect === true) {
      return `0 2px 12px ${alpha(theme.palette.customColors.green, 0.12)}`
    }
    if (isSelected && !isChecked) {
      return `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`
    }
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
  border: '1px solid',

  borderColor: (theme) => {
    if (isChecked) {
      const color = getCorrectnessColor(theme, isCorrect)
      return color ?? 'rgba(0, 0, 0, 0.23)'
    }
    return isSelected ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.23)'
  },

  backgroundColor: (theme) => {
    if (isChecked) {
      const color = getCorrectnessColor(theme, isCorrect)
      return color ?? 'transparent'
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

export const getMatchingLeftCardStyles = (
  isActive: boolean,
  isChecked: boolean,
  isMatched: boolean,
): SxProps<Theme> => ({
  display: 'flex',
  ...getBaseOptionStyles({ isChecked }),

  borderColor: (theme) => {
    if (isActive) return theme.palette.primary.main
    if (isMatched) return alpha(theme.palette.primary.main, 0.3)
    return 'rgba(0, 0, 0, 0.23)'
  },
  backgroundColor: (theme) => {
    if (isChecked) return 'transparent'
    if (isActive) return alpha(theme.palette.primary.main, 0.04)
    return 'transparent'
  },
  boxShadow: (theme) => {
    if (isActive && !isChecked) return `0 2px 10px ${alpha(theme.palette.primary.main, 0.12)}`
    return 'none'
  },
  '&:hover': isChecked
    ? {}
    : {
        borderColor: (theme: Theme) =>
          isActive ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.25),
        backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.02),
      },
})

export const getMatchingSlotStyles = (isMatched: boolean, isDragOver: boolean): SxProps<Theme> => ({
  minHeight: ROW_MIN_HEIGHT,
  borderRadius: '12px',
  border: isMatched ? 'none' : '1px dashed',
  borderColor: (theme) => {
    if (isDragOver) return theme.palette.primary.main
    if (isMatched) return 'transparent'
    return alpha(theme.palette.primary.main, 0.15)
  },
  backgroundColor: (theme) => {
    if (isDragOver) return alpha(theme.palette.primary.main, 0.04)
    if (isMatched) return 'transparent'
    return alpha(theme.palette.primary.main, 0.015)
  },
  boxShadow: (theme) =>
    isDragOver ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}` : 'none',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.15s',
  userSelect: 'none',
})

export const getMatchingChipStyles = (
  isChecked: boolean,
  isCorrect?: boolean,
  isInPool = false,
): SxProps<Theme> => ({
  ...getBaseOptionStyles({ isChecked, isCorrect, isSubtle: isInPool }),
  display: isInPool ? 'inline-flex' : 'flex',
  width: isInPool ? 'auto' : '100%',

  borderColor: (theme) => {
    if (isChecked) {
      const color = getCorrectnessColor(theme, isCorrect)
      return color ?? 'rgba(0, 0, 0, 0.23)'
    }
    if (isInPool) return alpha(theme.palette.primary.main, 0.2)
    return theme.palette.primary.main
  },
})

export const getInputStyles = ({ isChecked, isCorrect }: InputStylesParams): SxProps<Theme> => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.2s',

    backgroundColor: (theme) => {
      if (isChecked) {
        const color = getCorrectnessColor(theme, isCorrect)
        return color ? alpha(color, 0.06) : 'transparent'
      }
      return 'transparent'
    },

    '& .MuiOutlinedInput-notchedOutline': {
      transition: 'border-color 0.2s',
      borderWidth: '1px',
      borderColor: (theme) => {
        if (isChecked) {
          const color = getCorrectnessColor(theme, isCorrect)
          if (color) return color
        }
        return 'rgba(0, 0, 0, 0.23)'
      },
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => {
        if (isChecked) {
          const color = getCorrectnessColor(theme, isCorrect)
          if (color) return color
          return 'rgba(0, 0, 0, 0.23)'
        }
        return theme.palette.primary.main
      },
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: (theme) => {
        if (isChecked) {
          const color = getCorrectnessColor(theme, isCorrect)
          if (color) return color
        }
        return theme.palette.primary.main
      },
    },
  },
})

export const getFreeTextStyles = ({ status }: FreeTextStylesParams): SxProps<Theme> => {
  return {
    '& .MuiOutlinedInput-root': {
      transition: 'all 0.2s',
      backgroundColor: (theme) => {
        const color = getStatusColor(theme, status)
        return color ? alpha(color, 0.04) : 'transparent'
      },

      '& .MuiOutlinedInput-notchedOutline': {
        transition: 'border-color 0.2s',
        borderWidth: '1px',
        borderColor: (theme) => {
          const color = getStatusColor(theme, status)
          return color ?? 'rgba(0, 0, 0, 0.23)'
        },
      },

      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: (theme) => {
          const color = getStatusColor(theme, status)
          return color ?? theme.palette.primary.main
        },
      },

      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: (theme) => {
          const color = getStatusColor(theme, status)
          return color ?? theme.palette.primary.main
        },
      },

      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: (theme) => {
          const color = getStatusColor(theme, status)
          return color ?? 'rgba(0, 0, 0, 0.23)'
        },
      },
    },
  }
}

export const getResultBadgeStyles = (state: 'APPROVED' | 'PENDING' | 'FAILED'): SxProps<Theme> => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  px: 2.5,
  py: 1.25,
  borderRadius: '10px',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
  backgroundColor: (theme) => {
    const color = getStatusColor(theme, state)
    return color ? alpha(color, 0.1) : 'transparent'
  },
  color: (theme) => {
    const color = getStatusColor(theme, state as StepStatus)
    if (state === 'FAILED' && color) return darken(color, 0.1)
    return color ? darken(color, 0.2) : 'inherit'
  },
})
