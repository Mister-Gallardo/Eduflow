import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { CourseTeachCard } from '@/entities/course/ui/course-teach-card'
import { trpc } from '@/shared/api/trpc'
import cocoaImg from '@/shared/assets/images/cocoa.svg'

import type { StatusFilter, TeachTab } from '../model'
import { useTeachReplies } from '../model'

import { TeachCoursesSkeleton } from './teach-courses-skeleton/TeachCoursesSkeleton'
import { TeachRepliesSkeleton } from './teach-replies-skeleton/TeachRepliesSkeleton'
import { teachContainerStyles, teachGridStyles } from './CourseTeach.styles'
import { CreateCourseCard } from './create-course-card'
import { PendingRepliesSection } from './pending-replies-section'
import { ReviewedRepliesSection } from './reviewed-replies-section'
import { TeachRepliesFilters } from './teach-replies-filters'
import { TeachStatBarSkeleton, TeachStatsBar } from './teach-stats-bar'
import { TeachTabs } from './teach-tabs'

export const CourseTeach = () => {
  const [selectedTab, setSelectedTab] = useState<TeachTab>('courses')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: stats, isLoading: isStatsLoading } = trpc.teach.getStats.useQuery()

  const { data: courses = [], isLoading: isCoursesLoading } = trpc.teach.getCourses.useQuery(
    undefined,
    {
      enabled: selectedTab === 'courses',
      placeholderData: (prev) => prev,
    },
  )

  const {
    pendingQuery,
    reviewedQuery,
    pendingReplies,
    reviewedReplies,
    isLoading: isRepliesLoading,
  } = useTeachReplies(statusFilter, searchQuery)

  // ─── Accordion ───
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const effectiveExpandedId = expandedId ?? (pendingReplies[0]?.id || null)

  const handleToggle = (id: string) => {
    setExpandedId((prev) => {
      const current = prev ?? pendingReplies[0]?.id
      return current === id ? '' : id
    })
  }

  const handleCreateCourse = () => {
    // TODO: Navigate to course creation page
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

        {selectedTab === 'courses' && (
          <Box sx={teachGridStyles}>
            <CreateCourseCard onClick={handleCreateCourse} />
            {isCoursesLoading ? (
              <TeachCoursesSkeleton />
            ) : (
              courses.map((course, index) => (
                <CourseTeachCard key={course.id} course={course} index={index + 1} />
              ))
            )}
          </Box>
        )}

        {selectedTab === 'replies' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TeachRepliesFilters
              search={searchQuery}
              onSearch={setSearchQuery}
              status={statusFilter}
              onStatusChange={(v) => setStatusFilter(v)}
            />

            {isRepliesLoading && <TeachRepliesSkeleton />}

            {statusFilter !== 'REVIEWED' &&
              (pendingReplies.length !== 0 ? (
                <PendingRepliesSection
                  replies={pendingReplies}
                  isLoading={pendingQuery.isLoading}
                  hasNextPage={pendingQuery.hasNextPage}
                  isFetchingNextPage={pendingQuery.isFetchingNextPage}
                  fetchNextPage={pendingQuery.fetchNextPage}
                  expandedId={effectiveExpandedId}
                  onToggle={handleToggle}
                />
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: { xs: 4, md: 6 },
                    textAlign: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={cocoaImg}
                    sx={{
                      width: { xs: 120, md: 160 },
                      height: 'auto',
                      mb: 2,
                      opacity: 0.8,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Все работы проверены!
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 300 }}>
                    Отличная работа! Время сделать перерыв
                  </Typography>
                </Box>
              ))}

            {statusFilter !== 'PENDING' && (
              <ReviewedRepliesSection
                replies={reviewedReplies}
                isLoading={reviewedQuery.isLoading}
                hasNextPage={reviewedQuery.hasNextPage}
                isFetchingNextPage={reviewedQuery.isFetchingNextPage}
                fetchNextPage={reviewedQuery.fetchNextPage}
                expandedId={effectiveExpandedId}
                onToggle={handleToggle}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}
