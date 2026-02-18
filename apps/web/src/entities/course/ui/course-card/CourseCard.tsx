import { AccessTime, TrendingUp } from '@mui/icons-material'
import { alpha, Box, Chip, Typography, useTheme } from '@mui/material'

import { useIsMobile } from '@/shared/lib/useIsMobile'
import { MotionPaper } from '@/shared/ui/animations/motion'

import { getCategoryGradient, getCategoryImg, getLevelLabel, getLevelStyles } from '../../lib'
import type { Course } from '../../model'

import {
  categoryStyles,
  courseCardStyles,
  descriptionStyles,
  durationStyles,
  firstCircleStyles,
  footerStyles,
  headerStyles,
  priceStyles,
  secondCircleStyles,
  titleStyles,
} from './CourseCard.styles'

interface CourseCardProps {
  course: Course
  onEnroll: (id: string) => void
}

export const CourseCard = ({ course, onEnroll }: CourseCardProps) => {
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
      onClick={() => onEnroll(course.id)}
    >
      <Box
        sx={{
          ...headerStyles,
          background: getCategoryGradient(category),
        }}
      >
        <Box sx={firstCircleStyles} />
        <Box sx={secondCircleStyles} />

        <Box
          className="course-illustration"
          component="img"
          src={getCategoryImg(category)}
          alt={category}
          sx={categoryStyles}
        />

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
              background: isFree ? theme.palette.customColors.green : theme.palette.common.white,
              color: isFree ? '#fff' : theme.palette.primary.main,
              boxShadow: isFree
                ? '0 4px 12px rgba(16, 185, 129, 0.4)'
                : '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          background: theme.palette.common.white,
        }}
      >
        <Typography variant="subtitle1" sx={titleStyles}>
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
              {duration}
            </Typography>
          </Box>
        </Box>
      </Box>
    </MotionPaper>
  )
}
