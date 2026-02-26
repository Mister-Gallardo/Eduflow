import type { SvgIconComponent } from '@mui/icons-material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined'
import { alpha, darken, type Theme } from '@mui/material/styles'

export type CourseStatus = 'in_progress' | 'completed' | 'not_started'

export const getProgressPercent = (completedSteps: number, totalSteps: number): number =>
  totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100)

export const getCourseStatus = (completedSteps: number, totalSteps: number): CourseStatus => {
  if (completedSteps === 0) return 'not_started'
  if (totalSteps > 0 && completedSteps >= totalSteps) return 'completed'
  return 'in_progress'
}

interface StatusConfig {
  label: string
  icon: SvgIconComponent
  color: string
  bgColor: string
}

const STATUS_CONFIGS: Record<CourseStatus, (theme: Theme) => StatusConfig> = {
  in_progress: (theme) => ({
    label: 'В процессе',
    icon: LocalFireDepartmentOutlinedIcon,
    color: darken(theme.palette.customColors.orange, 0.1),
    bgColor: alpha(theme.palette.customColors.orange, 0.1),
  }),
  completed: (theme) => ({
    label: 'Завершён',
    icon: CheckCircleOutlineOutlinedIcon,
    color: darken(theme.palette.customColors.green, 0.1),
    bgColor: alpha(theme.palette.customColors.green, 0.1),
  }),
  not_started: (theme) => ({
    label: 'Не начат',
    icon: ClassOutlinedIcon,
    color: darken(theme.palette.primary.main, 0.1),
    bgColor: alpha(theme.palette.primary.main, 0.1),
  }),
}

export const getStatusConfig = (theme: Theme, status: CourseStatus): StatusConfig =>
  STATUS_CONFIGS[status](theme)
