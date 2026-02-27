import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { getCourseStatus } from '@/entities/course'
import type { LearnFilter } from '@/features/enrolled-filter'
import { EnrolledSearchInput, EnrolledTabs } from '@/features/enrolled-filter'
import { trpc } from '@/shared/api/trpc'
import { useDebounce } from '@/shared/lib/useDebounce'
import { EmptyState } from '@/shared/ui/feedback/empty-state'

import {
  libraryContainerStyles,
  libraryFiltersStyles,
  libraryHeaderStyles,
} from './CourseLibrary.styles'
import { LibraryList } from './library-list'
import { LibrarySkeleton } from './library-skeleton'
import { LibraryStatsBar } from './library-stats-bar'

export const CourseLibrary = () => {
  const [selectedFilter, setSelectedFilter] = useState<LearnFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearch = useDebounce(searchQuery, 300)

  const { data: enrolledCourses = [], isLoading: isEnrolledCoursesLoading } =
    trpc.enrollment.getEnrolledCourses.useQuery(undefined, {
      placeholderData: (prev) => prev,
      staleTime: 0,
    })

  const counts = (() => {
    const result: Record<LearnFilter, number> = {
      all: enrolledCourses.length,
      in_progress: 0,
      completed: 0,
      not_started: 0,
    }

    for (const course of enrolledCourses) {
      const status = getCourseStatus(course.completedSteps, course.totalSteps)
      result[status]++
    }

    return result
  })()

  const totalCompletedSteps = enrolledCourses.reduce((sum, c) => sum + c.completedSteps, 0)

  const filteredCourses = (() => {
    let result = enrolledCourses

    if (selectedFilter !== 'all') {
      result = result.filter(
        (c) => getCourseStatus(c.completedSteps, c.totalSteps) === selectedFilter,
      )
    }

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      result = result.filter((c) => c.title.toLowerCase().includes(query))
    }

    return result
  })()

  return (
    <Box component="section" sx={libraryContainerStyles}>
      <Box sx={libraryHeaderStyles}>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: 24, md: 28 } }}>
            Моё обучение
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Отслеживайте прогресс и продолжайте обучение
          </Typography>
        </Box>

        <LibraryStatsBar
          inProgress={counts.in_progress}
          completed={counts.completed}
          totalCompletedSteps={totalCompletedSteps}
        />
      </Box>

      {/* Filters */}
      <Box sx={libraryFiltersStyles}>
        <EnrolledTabs
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          counts={counts}
        />
        <EnrolledSearchInput searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </Box>

      {/* Content */}
      {isEnrolledCoursesLoading ? (
        <LibrarySkeleton />
      ) : filteredCourses.length > 0 ? (
        <LibraryList courses={filteredCourses} listKey={selectedFilter} />
      ) : (
        <EmptyState />
      )}
    </Box>
  )
}
