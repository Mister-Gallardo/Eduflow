import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { CourseFilters } from '@/features/course-filters'
import { trpc } from '@/shared/api'
import { useDebounce } from '@/shared/lib'
import { NotFound } from '@/shared/ui/not-found'
import { ViewAllDesktopButton } from '@/widgets/course-catalog/ui/ViewAllDesktopButton'

import { courseCatalogStyles } from './CourseCatalog.styles'
import { CourseList } from './CourseList'
import { LoadingSkeleton } from './LoadingSkeleton'

export const CourseCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearch = useDebounce(searchQuery, 300)

  const getQueryParams = () => {
    const baseParams: {
      search?: string
      categories?: string[]
      sortBy?: 'newest' | 'price_asc' | 'price_desc'
      limit?: number
    } = {
      search: debouncedSearch || undefined,
      limit: 6,
    }

    baseParams.sortBy = 'newest'

    if (selectedCategory === 'popular') {
      baseParams.categories = ['development', 'design', 'analytics', 'marketing']
    } else {
      baseParams.categories = [selectedCategory]
    }

    return baseParams
  }

  const { data: coursesData = [], isLoading: coursesIsLoading } = trpc.courses.getCourses.useQuery(
    getQueryParams(),
    {
      placeholderData: (previousData) => previousData,
    },
  )

  return (
    <Box component="section" sx={courseCatalogStyles}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: 800,
          color: 'text.primary',
          fontSize: { xs: 32, md: 40, lg: 50 },
          lineHeight: 1.2,
        }}
      >
        Найдите программу <br /> для быстрого старта
      </Typography>

      <CourseFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {coursesIsLoading ? (
        <LoadingSkeleton />
      ) : coursesData.length > 0 ? (
        <CourseList coursesData={coursesData} listKey={selectedCategory} />
      ) : (
        <NotFound />
      )}

      <ViewAllDesktopButton length={coursesData.length} isLoading={coursesIsLoading} />
    </Box>
  )
}
