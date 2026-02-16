import { alpha, type Theme } from '@mui/material/styles'

import analyticsImg from '@/shared/assets/images/analytics.svg'
import designImg from '@/shared/assets/images/design.svg'
import marketingImg from '@/shared/assets/images/marketing.svg'
import programmingImg from '@/shared/assets/images/programming.svg'

import type { CourseLevel } from '../model'

export const getCategoryGradient = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'development':
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    case 'design':
      return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    case 'analytics':
      return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    case 'marketing':
      return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    default:
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
}

export const getCategoryImg = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'development':
      return programmingImg
    case 'design':
      return designImg
    case 'analytics':
      return analyticsImg
    case 'marketing':
      return marketingImg
    default:
      return programmingImg
  }
}

export const getLevelLabel = (level: string): string => {
  switch (level) {
    case 'BEGINNER':
      return 'Начальный'
    case 'INTERMEDIATE':
      return 'Средний'
    case 'ADVANCED':
      return 'Продвинутый'
    default:
      return level
  }
}

export const getLevelStyles = (theme: Theme, level: CourseLevel) => {
  const colors = theme.palette.customColors

  const styles = {
    color: '#fff',
    fontWeight: 700,
    fontSize: '11px',
    borderRadius: '12px',
    px: 1,
    opacity: 1,
  }

  switch (level) {
    case 'BEGINNER':
      return {
        ...styles,
        background: alpha(colors.green, 0.9),
        boxShadow: `0 4px 12px ${alpha(colors.green, 0.4)}`,
      }
    case 'INTERMEDIATE':
      return {
        ...styles,
        background: alpha(colors.orange, 0.9),
        boxShadow: `0 4px 12px ${alpha(colors.orange, 0.4)}`,
      }
    case 'ADVANCED':
      return {
        ...styles,
        background: alpha(colors.red, 0.9),
        boxShadow: `0 4px 12px ${alpha(colors.red, 0.4)}`,
      }
    default:
      return {
        ...styles,
        background: alpha(colors.indigo, 0.9),
        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
      }
  }
}
