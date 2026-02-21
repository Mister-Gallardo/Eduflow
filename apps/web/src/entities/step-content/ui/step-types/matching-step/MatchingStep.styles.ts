import { alpha, type SxProps, type Theme } from '@mui/material/styles'

// Единая высота строки для синхронизации левой карточки и правого слота
const ROW_MIN_HEIGHT = 52

export const pairsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
}

export const getPairRowStyles = (isActive: boolean, isDragOver: boolean): SxProps<Theme> => ({
  display: 'grid',
  // Мобилка: 1 колонка (карточка + иконка + слот стекаются вертикально)
  // Десктоп: 3 колонки side-by-side
  gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
  gridTemplateRows: { xs: 'auto', sm: 'auto' },
  alignItems: 'center',
  gap: { xs: 0.75, sm: 1.5 },
  transition: 'opacity 0.15s',
  opacity: isActive || isDragOver ? 1 : 0.95,
})

export const getLeftCardStyles = (
  isActive: boolean,
  isChecked: boolean,
  isMatched: boolean,
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  px: 2,
  py: 1.25,
  minHeight: ROW_MIN_HEIGHT,
  borderRadius: '12px',
  cursor: isChecked ? 'default' : 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s',
  border: '2px solid',
  borderColor: (theme) => {
    if (isChecked) return alpha(theme.palette.primary.main, 0.08)
    if (isActive) return theme.palette.primary.main
    if (isMatched) return alpha(theme.palette.primary.main, 0.3)
    return alpha(theme.palette.primary.main, 0.08)
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

export const connectorIconStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // На мобилке: центрируем иконку стрелки вниз
  margin: { xs: '0 auto', sm: 0 },
  color: (theme) => alpha(theme.palette.primary.main, 0.3),
  flexShrink: 0,
}

export const getSlotStyles = (
  isMatched: boolean,
  isDragOver: boolean,
  isChecked: boolean,
): SxProps<Theme> => ({
  minHeight: ROW_MIN_HEIGHT,
  // px: 1.5,
  py: 1,
  borderRadius: '12px',
  border: isMatched ? 'none' : '2px dashed',
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
  cursor: isChecked ? 'default' : 'default',
})

// Чип — в слоте растянут на всю ширину, в пуле — по контенту
export const getChipStyles = (
  isChecked: boolean,
  isCorrect?: boolean,
  isInPool = false,
): SxProps<Theme> => ({
  // В слоте занимает всю ширину, в пуле — по контенту
  display: isInPool ? 'inline-flex' : 'flex',
  width: isInPool ? 'auto' : '100%',
  alignItems: 'center',
  gap: 0.75,
  px: 1.75,
  py: 1,
  borderRadius: '10px',
  border: '2px solid',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: 1.4,
  cursor: isChecked ? 'default' : 'pointer',
  userSelect: 'none',
  transition: 'all 0.15s',
  minHeight: isInPool ? 'auto' : ROW_MIN_HEIGHT - 8,

  borderColor: (theme) => {
    if (isChecked && isCorrect === true) return theme.palette.customColors.green
    if (isChecked && isCorrect === false) return theme.palette.customColors.red
    if (isInPool) return alpha(theme.palette.primary.main, 0.2)
    return theme.palette.primary.main
  },

  backgroundColor: (theme) => {
    if (isChecked && isCorrect === true) return alpha(theme.palette.customColors.green, 0.06)
    if (isChecked && isCorrect === false) return alpha(theme.palette.customColors.red, 0.06)
    if (isInPool) return 'transparent'
    return alpha(theme.palette.primary.main, 0.04)
  },

  color: (theme) => {
    if (isChecked && isCorrect === true) return theme.palette.customColors.green
    if (isChecked && isCorrect === false) return theme.palette.customColors.red
    if (isInPool) return 'text.secondary'
    return 'primary.main'
  },

  boxShadow: (theme) => {
    if (isChecked && isCorrect === true)
      return `0 2px 8px ${alpha(theme.palette.customColors.green, 0.15)}`
    if (!isChecked && !isInPool) return `0 2px 6px ${alpha(theme.palette.primary.main, 0.1)}`
    return 'none'
  },

  '&:hover': isChecked
    ? {}
    : {
        borderColor: (theme: Theme) =>
          isInPool ? alpha(theme.palette.primary.main, 0.4) : theme.palette.primary.dark,
        backgroundColor: (theme: Theme) =>
          isInPool
            ? alpha(theme.palette.primary.main, 0.04)
            : alpha(theme.palette.primary.main, 0.06),
      },
})

export const getPoolContainerStyles = (isDragOver: boolean): SxProps<Theme> => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  p: 2,
  borderRadius: '14px',
  border: '1px solid',
  borderColor: (theme) =>
    isDragOver ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.08),
  backgroundColor: (theme) =>
    isDragOver ? alpha(theme.palette.primary.main, 0.03) : alpha(theme.palette.primary.main, 0.012),
  boxShadow: (theme) =>
    isDragOver ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}` : 'none',
  minHeight: 64,
  transition: 'all 0.15s',
})

/** @deprecated use getPoolContainerStyles */
export const chipPoolStyles: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  p: 2,
  borderRadius: '14px',
  border: '1px solid',
  borderColor: (theme) => alpha(theme.palette.primary.main, 0.08),
  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.012),
  minHeight: 64,
}

export const emptyPoolStyles: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.25,
  color: (theme) => alpha(theme.palette.primary.main, 0.4),
  py: 0.5,
}

export const poolLabelStyles: SxProps<Theme> = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'text.disabled',
  mb: 1,
}
