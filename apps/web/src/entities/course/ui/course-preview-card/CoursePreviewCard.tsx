import { AccessTime, TrendingUp } from '@mui/icons-material'
import { alpha, Box, Chip, darken, Typography, useTheme } from '@mui/material'

import { formatHours } from '@/entities/course/lib/format-hours'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { MotionPaper } from '@/shared/ui/animations/motion'

import { getLevelLabel, getLevelStyles } from '../../lib'
import type { Course } from '../../model'
import { CourseImage } from '../course-image'

import {
  courseCardStyles,
  descriptionStyles,
  durationStyles,
  footerStyles,
  priceStyles,
  titleStyles,
} from './CoursePreviewCard.styles'

interface CourseCardProps {
  course: Course
  onEnroll: (id: string) => void
  isPending: boolean
}

export const CoursePreviewCard = ({ course, onEnroll, isPending }: CourseCardProps) => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const { title, description, duration, level, price, category } = course

  const isFree = price === 0

  const levelStyles = getLevelStyles(theme, level)

  return (
    <MotionPaper
      elevation={0}
      whileHover={{
        y: !isMobile ? -10 : 0,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      sx={{
        ...courseCardStyles,
        '&:hover': {
          boxShadow: isMobile ? 'none' : `0 16px 24px ${alpha(theme.palette.primary.main, 0.05)}`,
        },
      }}
      onClick={() => !isPending && onEnroll(course.id)}
    >
      <CourseImage category={category} variant="card" sx={{ height: { xs: 140, sm: 160 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 'layoutLow',
          }}
        >
          <Chip
            icon={<TrendingUp sx={{ fontSize: 14, color: '#fff !important' }} />}
            label={getLevelLabel(level)}
            size="small"
            sx={levelStyles}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            zIndex: 'layoutLow',
          }}
        >
          <Chip
            label={isFree ? 'Бесплатно' : `${price.toLocaleString('ru-RU')} ₽`}
            size="small"
            sx={{
              ...priceStyles,
              background: isFree
                ? darken(theme.palette.customColors.green, 0.3)
                : theme.palette.common.white,
              color: isFree ? '#fff' : theme.palette.primary.main,
              boxShadow: isFree
                ? '0 4px 12px rgba(16, 185, 129, 0.4)'
                : '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
        </Box>
      </CourseImage>

      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          background: theme.palette.common.white,
        }}
      >
        <Typography variant="body1" sx={titleStyles}>
          {title}
        </Typography>

        <Typography variant="body2" sx={descriptionStyles}>
          {description}
        </Typography>

        <Box sx={footerStyles}>
          <Box sx={durationStyles}>
            <AccessTime sx={{ fontSize: 16, opacity: 0.6 }} />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: '0.8rem',
              }}
            >
              {formatHours(duration)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </MotionPaper>
  )
}
