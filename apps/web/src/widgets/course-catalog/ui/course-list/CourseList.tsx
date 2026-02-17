import { Box } from '@mui/material'
import { AnimatePresence } from 'motion/react'
import { useEffect, useRef } from 'react'

import { CourseCard } from '@/entities/course'
import type { ApiOutputs } from '@/shared/api/trpc'
import { useIsMobile } from '@/shared/lib'
import { MotionBox } from '@/shared/ui'

import { ViewAllMobileButton } from '../view-all-mobile-button'

import { courseListStyles } from './CourseList.styles'

type CoursesData = ApiOutputs['courses']['getCourses']

interface CourseListProps {
  coursesData: CoursesData
  listKey?: string
}

export const CourseList = ({ coursesData, listKey }: CourseListProps) => {
  const isMobile = useIsMobile()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [listKey])

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
    <Box sx={courseListStyles} ref={scrollContainerRef}>
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
              <CourseCard course={course} />
            </MotionBox>
          ))}
        </MotionBox>
      </AnimatePresence>

      <ViewAllMobileButton />
    </Box>
  ) : (
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
            <CourseCard course={course} />
          </MotionBox>
        ))}
      </AnimatePresence>
    </Box>
  )
}
