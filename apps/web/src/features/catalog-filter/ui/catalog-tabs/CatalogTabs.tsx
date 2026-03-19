import type { FilterTab } from '@/shared/ui/data-display/filter-tabs'
import { FilterTabs } from '@/shared/ui/data-display/filter-tabs'

const CATEGORIES: FilterTab<string>[] = [
  { label: 'Часто выбирают', value: 'popular' },
  { label: 'Разработка', value: 'DEVELOPMENT' },
  { label: 'Дизайн', value: 'DESIGN' },
  { label: 'Аналитика', value: 'ANALYTICS' },
  { label: 'Маркетинг', value: 'MARKETING' },
]

interface CatalogTabsProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export const CatalogTabs = ({ selectedCategory, onCategoryChange }: CatalogTabsProps) => (
  <FilterTabs<string>
    tabs={CATEGORIES}
    value={selectedCategory}
    onChange={onCategoryChange}
    layoutId="catalogTab"
  />
)
