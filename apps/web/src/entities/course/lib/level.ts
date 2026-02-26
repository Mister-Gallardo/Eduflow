import { alpha, type Theme } from '@mui/material/styles'

import type { CourseLevel } from '../model'

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Начальный',
  INTERMEDIATE: 'Средний',
  ADVANCED: 'Продвинутый',
}

export const getLevelLabel = (level: string): string => LEVEL_LABELS[level] ?? level

const LEVEL_COLORS: Record<CourseLevel, 'green' | 'orange' | 'red'> = {
  BEGINNER: 'green',
  INTERMEDIATE: 'orange',
  ADVANCED: 'red',
}

export const getLevelStyles = (theme: Theme, level: CourseLevel) => {
  const colorKey = LEVEL_COLORS[level]
  const color = theme.palette.customColors[colorKey]

  return {
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: '11px',
    borderRadius: '12px',
    px: 1,
    opacity: 1,
    background: alpha(color, 0.9),
    boxShadow: `0 4px 12px ${alpha(color, 0.4)}`,
  }
}
