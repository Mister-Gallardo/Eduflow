import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import { alpha, Box, Button, Chip, LinearProgress, Typography, useTheme } from '@mui/material'

import { useIsMobile } from '@/shared/lib/useIsMobile'
import { MotionPaper } from '@/shared/ui/animations/motion'

import {
  formatTimeAgo,
  getCategoryLabel,
  getCourseStatus,
  getProgressPercent,
  getStatusConfig,
} from '../../lib'
import type { EnrolledCourse } from '../../model'
import { CourseImage } from '../course-image'

import {
  actionButtonStyles,
  categoryChipStyles,
  completedOverlayStyles,
  contentStyles,
  enrolledCardStyles,
  footerMetaStyles,
  footerStyles,
  imageContainerStyles,
  progressBarContainerStyles,
  progressBarTrackStyles,
  progressLineStyles,
  statusChipStyles,
  titleStyles,
} from './CourseProgressCard.styles'

interface CourseProgressCardProps {
  course: EnrolledCourse
  onContinue: (courseId: string) => void
}

export const CourseProgressCard = ({ course, onContinue }: CourseProgressCardProps) => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const percent = getProgressPercent(course.completedSteps, course.totalSteps)
  const status = getCourseStatus(course.completedSteps, course.totalSteps)
  const statusConfig = getStatusConfig(theme, status)

  const StatusIcon = statusConfig.icon

  const isCompleted = status === 'completed'
  const isNotStarted = status === 'not_started'

  const buttonLabel = isCompleted ? 'Повторить' : isNotStarted ? 'Начать' : 'Продолжить'
  const ButtonIcon = isCompleted
    ? ReplayOutlinedIcon
    : isNotStarted
      ? PlayCircleOutlineOutlinedIcon
      : ArrowForwardIosOutlinedIcon

  return (
    <MotionPaper
      elevation={0}
      whileHover={{
        y: !isMobile ? -10 : 0,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      sx={{
        ...enrolledCardStyles,
        '&:hover': {
          boxShadow: isMobile ? 'none' : `0 16px 24px ${alpha(theme.palette.primary.main, 0.05)}`,
        },
      }}
      onClick={() => onContinue(course.id)}
    >
      {/* Image Section */}
      <Box sx={imageContainerStyles}>
        <CourseImage
          category={course.category}
          variant={isMobile ? 'card' : 'default'}
          sx={{ height: { xs: 140, sm: '100%' }, borderRadius: 0 }}
        >
          {isCompleted && (
            <Box sx={completedOverlayStyles}>
              <CheckCircleOutlineOutlinedIcon
                sx={{ fontSize: 40, color: theme.palette.common.white }}
              />
            </Box>
          )}
        </CourseImage>
      </Box>

      {/* Content Section */}
      <Box sx={contentStyles}>
        <Box sx={categoryChipStyles}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, fontSize: 12, color: 'text.secondary' }}
          >
            {getCategoryLabel(course.category)}
          </Typography>

          <Chip
            label={statusConfig.label}
            icon={<StatusIcon />}
            size="small"
            sx={{
              ...statusChipStyles,
              color: statusConfig.color,
              bgcolor: statusConfig.bgColor,
            }}
          />
        </Box>

        <Typography variant="body1" sx={titleStyles}>
          {course.title}
        </Typography>

        {/* Progress */}
        <Box sx={progressBarContainerStyles}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: 'text.secondary', whiteSpace: 'nowrap' }}
            >
              {course.completedSteps} / {course.totalSteps} шагов
            </Typography>

            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: 'text.primary', minWidth: 32, textAlign: 'right' }}
            >
              {percent}%
            </Typography>
          </Box>

          <Box sx={progressBarTrackStyles}>
            <LinearProgress
              aria-label="Прогресс по курсу"
              variant="determinate"
              value={percent}
              sx={progressLineStyles}
            />
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={footerStyles}>
          {course.lastActivityAt && (
            <Box sx={footerMetaStyles}>
              <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {formatTimeAgo(course.lastActivityAt)}
              </Typography>
            </Box>
          )}

          <Button
            variant={isCompleted ? 'outlined' : 'contained'}
            size="small"
            endIcon={<ButtonIcon />}
            onClick={(e) => {
              e.stopPropagation()
              onContinue(course.id)
            }}
            sx={actionButtonStyles}
          >
            {buttonLabel}
          </Button>
        </Box>
      </Box>
    </MotionPaper>
  )
}
