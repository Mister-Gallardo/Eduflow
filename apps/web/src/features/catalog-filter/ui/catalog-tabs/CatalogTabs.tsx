import type { FilterTab } from '@/shared/ui/data-display/filter-tabs'
import { FilterTabs } from '@/shared/ui/data-display/filter-tabs'

const CATEGORIES: FilterTab<string>[] = [
  { label: 'Часто выбирают', value: 'popular' },
  { label: 'Разработка', value: 'development' },
  { label: 'Дизайн', value: 'design' },
  { label: 'Аналитика', value: 'analytics' },
  { label: 'Маркетинг', value: 'marketing' },
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
