import { Box } from '@mui/material'

import { CategoryTabs } from './category-tabs'
import { courseFiltersStyles } from './CourseFilters.styles'
import { SearchInput } from './search-input'

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
}: CourseFiltersProps) => (
  <Box sx={courseFiltersStyles}>
    <SearchInput searchQuery={searchQuery} onSearchChange={onSearchChange} />

    <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
  </Box>
)
