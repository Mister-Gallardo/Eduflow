import { alpha, type Theme } from '@mui/material'

import { analytics, design, marketing, programming } from '@/shared/assets'

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

export const getCategoryIcon = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'development':
      return programming
    case 'design':
      return design
    case 'analytics':
      return analytics
    case 'marketing':
      return marketing
    default:
      return programming
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
