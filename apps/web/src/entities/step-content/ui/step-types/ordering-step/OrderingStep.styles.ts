import { alpha, type SxProps, type Theme } from '@mui/material/styles'

import { ROW_MIN_HEIGHT } from '@/entities/step-content/lib'

export const orderingContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 1.5, sm: 1 },
}

export const getOrderingItemStyles = (
  isChecked: boolean,
  isCorrect?: boolean,
  isDragging = false,
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: ROW_MIN_HEIGHT,
  gap: 1.5,
  px: 2,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.4,
  userSelect: 'none',
  border: '1px solid',
  borderRadius: '12px',
  transition: 'background-color 0.2s, border-color 0.2s, box-shadow 0.2s',
  opacity: isDragging ? 0.4 : 1,
  cursor: isChecked ? 'default' : 'grab',

  borderColor: (theme) => {
    if (isChecked) {
      if (isCorrect === true) return theme.palette.customColors.green
      if (isCorrect === false) return theme.palette.customColors.red
      return 'rgba(0, 0, 0, 0.23)'
    }
    return alpha(theme.palette.primary.main, 0.2)
  },

  backgroundColor: (theme) => {
    if (isChecked) {
      if (isCorrect === true) return alpha(theme.palette.customColors.green, 0.06)
      if (isCorrect === false) return alpha(theme.palette.customColors.red, 0.06)
      return 'transparent'
    }
    return 'transparent'
  },

  boxShadow: (theme) => {
    if (isChecked && isCorrect === true) {
      return `0 2px 12px ${alpha(theme.palette.customColors.green, 0.12)}`
    }
    return 'none'
  },

  '&:hover': isChecked
    ? {}
    : {
        borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.4),
        backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.02),
      },
})

export const getOrderingIndexStyles = (
  isChecked: boolean,
  isCorrect?: boolean,
): SxProps<Theme> => ({
  width: 28,
  height: 28,
  minWidth: 28,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  fontWeight: 700,
  flexShrink: 0,
  transition: 'all 0.2s',

  backgroundColor: (theme) => {
    if (isChecked) {
      if (isCorrect === true) return theme.palette.customColors.green
      if (isCorrect === false) return theme.palette.customColors.red
      return alpha(theme.palette.primary.main, 0.08)
    }
    return alpha(theme.palette.primary.main, 0.08)
  },

  color: (theme) => {
    if (isChecked && (isCorrect === true || isCorrect === false)) {
      return theme.palette.common.white
    }
    return theme.palette.primary.main
  },
})

export const dragHandleStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  color: (theme) => alpha(theme.palette.primary.main, 0.3),
  cursor: 'grab',
  flexShrink: 0,
  touchAction: 'none',
  '&:hover': {
    color: (theme: Theme) => alpha(theme.palette.primary.main, 0.6),
  },
}
