import { COURSE_CATEGORIES } from '@eduflow/shared'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { CatalogSearchInput, CatalogTabs } from '@/features/catalog-filter'
import { trpc } from '@/shared/api/trpc'
import { useDebounce } from '@/shared/lib/useDebounce'
import { EmptyState } from '@/shared/ui/feedback/empty-state'

import { CatalogList } from './catalog-list'
import { CatalogSkeleton } from './catalog-skeleton'
import { catalogContainerStyles, catalogFiltersStyles } from './CourseCatalog.styles'

export const CourseCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearch = useDebounce(searchQuery, 300)

  const queryParams = (() => {
    const categories =
      selectedCategory === 'popular'
        ? [...COURSE_CATEGORIES]
        : [selectedCategory as (typeof COURSE_CATEGORIES)[number]]

    return {
      search: debouncedSearch || undefined,
      limit: 6,
      sortBy: 'newest' as const,
      categories,
    }
  })()

  const { data: courses = [], isLoading: isCoursesLoading } = trpc.courses.getCourses.useQuery(
    queryParams,
    {
      placeholderData: (previousData) => previousData,
    },
  )

  return (
    <Box id="course-catalog" component="section" sx={catalogContainerStyles}>
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

      <Box sx={catalogFiltersStyles}>
        <CatalogSearchInput searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <CatalogTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </Box>

      {isCoursesLoading ? (
        <CatalogSkeleton />
      ) : courses.length > 0 ? (
        <CatalogList courses={courses} listKey={selectedCategory} />
      ) : (
        <EmptyState />
      )}
    </Box>
  )
}
