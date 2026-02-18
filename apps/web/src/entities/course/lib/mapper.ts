import { alpha, type Theme } from '@mui/material/styles'

import analyticsImg from '@/shared/assets/images/analytics.svg'
import designImg from '@/shared/assets/images/design.svg'
import marketingImg from '@/shared/assets/images/marketing.svg'
import programmingImg from '@/shared/assets/images/programming.svg'

import type { CourseLevel } from '../model'

const CATEGORY_GRADIENTS: Record<string, string> = {
  development: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  design: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  analytics: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  marketing: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
}

export const getCategoryGradient = (category: string): string =>
  CATEGORY_GRADIENTS[category.toLowerCase()] ?? CATEGORY_GRADIENTS.development

const CATEGORY_IMAGES: Record<string, string> = {
  development: programmingImg,
  design: designImg,
  analytics: analyticsImg,
  marketing: marketingImg,
}

export const getCategoryImg = (category: string): string =>
  CATEGORY_IMAGES[category.toLowerCase()] ?? programmingImg

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
