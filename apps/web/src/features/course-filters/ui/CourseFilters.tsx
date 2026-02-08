import { alpha, Box, useTheme } from '@mui/material'

import { CategoryTabs } from '@/features/course-filters/ui/CategoryTabs'
import { SearchInput } from '@/features/course-filters/ui/SearchInput'

import { courseFiltersStyles } from './CourseFilters.styles'

interface CourseFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const CourseFilters = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: CourseFiltersProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        ...courseFiltersStyles,
        borderColor: alpha(theme.palette.primary.main, 0.1),
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.05)}`,
      }}
    >
      <SearchInput searchQuery={searchQuery} onSearchChange={onSearchChange} />

      <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
    </Box>
  )
}
