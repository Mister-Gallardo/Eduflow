import { Box } from '@mui/material'
import { AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'

import type { EnrolledCourse } from '@/entities/course'
import { CourseProgressCard } from '@/entities/course'
import { paths } from '@/shared/config/paths'
import { MotionBox } from '@/shared/ui/animations/motion'

import { listContainerStyles } from './LibraryList.styles'

interface LibraryListProps {
  courses: EnrolledCourse[]
  listKey: string
}

export const LibraryList = ({ courses, listKey }: LibraryListProps) => {
  const navigate = useNavigate()

  const handleContinue = (courseId: string) => {
    void navigate(paths.course.view(courseId))
  }

  return (
    <Box sx={listContainerStyles}>
      <AnimatePresence mode="popLayout" initial={true}>
        {courses.map((course, index) => (
          <MotionBox
            key={`${listKey}-${course.id}`}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.35,
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
          >
            <CourseProgressCard course={course} onContinue={handleContinue} />
          </MotionBox>
        ))}
      </AnimatePresence>
    </Box>
  )
}
