import { ArrowForward } from '@mui/icons-material'
import { Box, Button, ButtonBase, Typography } from '@mui/material'
import { AnimatePresence } from 'motion/react'
import { useEffect, useRef } from 'react'

import { CoursePreviewCard } from '@/entities/course'
import { useMe } from '@/entities/user'
import { useEnrollCourse } from '@/features/catalog-filter'
import type { ApiOutputs } from '@/shared/api/trpc'
import { messages } from '@/shared/config/messages'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { MotionBox } from '@/shared/ui/animations/motion'
import { useSnackbar } from '@/shared/ui/feedback/snackbar'

import {
  desktopListContainerStyles,
  mobileListContainerStyles,
  viewAllDesktopButtonStyles,
  viewAllMobileButtonStyles,
  viewAllMobileContainerStyles,
  viewAllMobileIconStyles,
} from './CatalogList.styles'

type CoursesData = ApiOutputs['courses']['getCourses']

interface CatalogListProps {
  coursesData: CoursesData
  listKey?: string
}

export const CatalogList = ({ coursesData, listKey }: CatalogListProps) => {
  const isMobile = useIsMobile()

  const showSnackbar = useSnackbar()

  const { userData, isUserLoading } = useMe()

  const { enroll, isEnrollPending } = useEnrollCourse()

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [listKey])

  const handleEnroll = (courseId: string) => {
    if (isUserLoading) {
      return showSnackbar({
        severity: 'info',
        message: messages.loading,
      })
    }

    if (!userData) {
      return showSnackbar({
        severity: 'warning',
        message: messages.authRequired,
      })
    }

    enroll(courseId)
  }

  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const mobileItemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: [0, 0, 0.2, 1] as const },
    },
  }

  return isMobile ? (
    <Box sx={mobileListContainerStyles} ref={scrollContainerRef}>
      <AnimatePresence mode="wait" initial={false}>
        <MotionBox
          key={`${listKey}-${coursesData.map((c) => c.id).join('')}`}
          variants={mobileContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          sx={{
            display: 'flex',
            gap: 2.5,
          }}
        >
          {coursesData.map((course) => (
            <MotionBox
              key={course.id}
              variants={mobileItemVariants}
              style={{
                flexShrink: 0,
                width: '300px',
                scrollSnapAlign: 'start',
              }}
            >
              <CoursePreviewCard
                course={course}
                onEnroll={handleEnroll}
                isPending={isEnrollPending}
              />
            </MotionBox>
          ))}
        </MotionBox>
      </AnimatePresence>

      <Box sx={viewAllMobileContainerStyles}>
        <ButtonBase
          disableRipple
          onClick={() => {
            console.info('pressed')
          }}
          sx={viewAllMobileButtonStyles}
        >
          <Box sx={viewAllMobileIconStyles}>
            <ArrowForward />
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: (theme) => theme.palette.primary.main,
              textAlign: 'center',
            }}
          >
            Смотреть все
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  ) : (
    <Box sx={desktopListContainerStyles}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 3,
        }}
      >
        <AnimatePresence mode="popLayout" initial={true}>
          {coursesData.map((course, index) => (
            <MotionBox
              key={course.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.35,
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.2 },
              }}
            >
              <CoursePreviewCard
                course={course}
                onEnroll={handleEnroll}
                isPending={isEnrollPending}
              />
            </MotionBox>
          ))}
        </AnimatePresence>
      </Box>

      <Button variant="outlined" sx={viewAllDesktopButtonStyles}>
        Смотреть все курсы
      </Button>
    </Box>
  )
}
