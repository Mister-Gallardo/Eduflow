import { SearchInput } from '@/shared/ui/inputs/search-input'

interface CatalogSearchInputProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const CatalogSearchInput = ({ searchQuery, onSearchChange }: CatalogSearchInputProps) => (
  <SearchInput value={searchQuery} onChange={onSearchChange} placeholder="Найти курс..." />
)
