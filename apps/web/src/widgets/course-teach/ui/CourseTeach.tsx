import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { alpha, Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CourseTeachCard } from '@/entities/course/ui/course-teach-card'
import { trpc } from '@/shared/api/trpc'
import { paths } from '@/shared/config/paths'
import type { TeachTab } from '@/widgets/course-teach/model'
import { TeachStatBarSkeleton } from '@/widgets/course-teach/ui/teach-stats-bar/TeachStatsBarSkeleton'

import { teachContainerStyles, teachGridStyles } from './CourseTeach.styles'
import { CreateCourseCard } from './create-course-card'
import { TeachStatsBar } from './teach-stats-bar'
import { TeachTabs } from './teach-tabs'

export const CourseTeach = () => {
  const theme = useTheme()

  const navigate = useNavigate()

  const [selectedTab, setSelectedTab] = useState<TeachTab>('courses')

  const { data: stats, isLoading: isStatsLoading } = trpc.teach.getStats.useQuery()

  const { data: courses = [], isLoading: isCoursesLoading } = trpc.teach.getCourses.useQuery(
    undefined,
    {
      placeholderData: (prev) => prev,
    },
  )

  const handleCreateCourse = () => {
    // TODO: Navigate to course creation page
  }

  const handleCourseView = (courseId: string) => {
    void navigate(paths.course.view(courseId))
  }

  const handleCourseEdit = (courseId: string) => {
    // TODO: Navigate to course edit page
    void navigate(paths.course.edit(courseId))
  }

  return (
    <Box component="section" sx={teachContainerStyles}>
      <Box>
        <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: 24, md: 28 } }}>
          Преподавание
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Управляйте своими курсами и проверяйте ответы студентов
        </Typography>
      </Box>

      {isStatsLoading ? (
        <TeachStatBarSkeleton />
      ) : (
        <TeachStatsBar
          totalCourses={stats?.totalCourses ?? 0}
          totalStudents={stats?.totalStudents ?? 0}
          totalCompletedSteps={stats?.totalCompletedSteps ?? 0}
          pendingReviewCount={stats?.pendingReviewCount ?? 0}
        />
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
        <TeachTabs
          value={selectedTab}
          onChange={setSelectedTab}
          reviewCount={stats?.pendingReviewCount ?? 0}
        />

        {/* Content */}
        {selectedTab === 'courses' && (
          <Box sx={teachGridStyles}>
            {/* Create new course card */}
            <CreateCourseCard onClick={handleCreateCourse} />

            {/* Course cards */}
            {!isCoursesLoading &&
              courses.map((course, index) => (
                <CourseTeachCard
                  key={course.id}
                  course={course}
                  index={index + 1}
                  onView={handleCourseView}
                  onEdit={handleCourseEdit}
                />
              ))}
          </Box>
        )}

        {selectedTab === 'reviews' && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              borderRadius: 4,
            }}
          >
            <AssignmentOutlinedIcon
              sx={{ fontSize: 64, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Проверка ответов
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Здесь будет список ответов студентов на проверку
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
