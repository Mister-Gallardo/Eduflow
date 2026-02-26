import { SearchInput } from '@/shared/ui/inputs/search-input'

interface EnrolledSearchInputProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const EnrolledSearchInput = ({ searchQuery, onSearchChange }: EnrolledSearchInputProps) => (
  <SearchInput value={searchQuery} onChange={onSearchChange} placeholder="Найти в моих курсах..." />
)
