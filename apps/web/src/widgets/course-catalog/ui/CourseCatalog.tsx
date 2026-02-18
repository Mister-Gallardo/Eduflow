import { Box, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

import { CategoryTabs, SearchInput } from '@/features/course'
import { trpc } from '@/shared/api/trpc'
import { useDebounce } from '@/shared/lib/useDebounce'
import { EmptyState } from '@/shared/ui/feedback/empty-state'

import { CourseList } from './course-list'
import { courseCatalogStyles, courseFiltersStyles } from './CourseCatalog.styles'
import { LoadingSkeleton } from './loading-skeleton'
import { ViewAllDesktopButton } from './view-all-desktop-button'

export const CourseCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearch = useDebounce(searchQuery, 300)

  const queryParams = useMemo(() => {
    const categories =
      selectedCategory === 'popular'
        ? ['development', 'design', 'analytics', 'marketing']
        : [selectedCategory]

    return {
      search: debouncedSearch || undefined,
      limit: 6,
      sortBy: 'newest' as const,
      categories,
    }
  }, [debouncedSearch, selectedCategory])

  const { data: coursesData = [], isLoading: isCoursesLoading } = trpc.courses.getCourses.useQuery(
    queryParams,
    {
      placeholderData: (previousData) => previousData,
    },
  )

  return (
    <Box id="course-catalog" component="section" sx={courseCatalogStyles}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          fontSize: { xs: 32, md: 40, lg: 50 },
          lineHeight: 1.2,
        }}
      >
        Найдите программу <br /> для быстрого старта
      </Typography>

      <Box sx={courseFiltersStyles}>
        <SearchInput searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </Box>

      {isCoursesLoading ? (
        <LoadingSkeleton />
      ) : coursesData.length > 0 ? (
        <CourseList coursesData={coursesData} listKey={selectedCategory} />
      ) : (
        <EmptyState />
      )}

      <ViewAllDesktopButton length={coursesData.length} isLoading={isCoursesLoading} />
    </Box>
  )
}
