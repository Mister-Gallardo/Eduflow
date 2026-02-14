import { AccessTime, TrendingUp } from '@mui/icons-material'
import { alpha, Box, Chip, Paper, Typography, useTheme } from '@mui/material'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

import { trpc } from '@/shared/api'
import { paths } from '@/shared/config'
import { useIsMobile } from '@/shared/lib'
import { useSnackbar } from '@/shared/ui'

import { getCategoryGradient, getCategoryIcon, getLevelLabel, getLevelStyles } from '../lib'
import type { Course } from '../model'

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
}

const MotionPaper = motion.create(Paper)

export const CourseCard = ({ course }: CourseCardProps) => {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const showSnackbar = useSnackbar()

  const { title, description, duration, level, price, category } = course

  const isFree = price === 0

  const levelStyles = getLevelStyles(theme, level)

  const enrollMutation = trpc.learning.enroll.useMutation({
    onSuccess: (data) => {
      void navigate(paths.learn.setup(course.id))

      if (data.message !== 'Already enrolled') {
        void showSnackbar({
          message: 'Вы успешно записались на курс!',
          severity: 'success',
        })
      }
    },
    onError: () => {
      void showSnackbar({
        message: 'Что-то пошло не так. Попробуйте еще раз.',
        severity: 'error',
      })
    },
  })

  const onSubmit = () => {
    void enrollMutation.mutateAsync({ courseId: course.id })
  }

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
      onClick={onSubmit}
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
          src={getCategoryIcon(category)}
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
              background: isFree ? theme.palette.customColors.green : '#fff',
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
          background: '#fff',
        }}
      >
        <Typography variant="subtitle1" sx={titleStyles}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            ...descriptionStyles,
            color: theme.palette.text.secondary,
          }}
        >
          {description}
        </Typography>

        <Box sx={footerStyles}>
          <Box
            sx={{
              ...durationStyles,
              color: theme.palette.text.secondary,
              background: alpha(theme.palette.divider, 0.05),
            }}
          >
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
