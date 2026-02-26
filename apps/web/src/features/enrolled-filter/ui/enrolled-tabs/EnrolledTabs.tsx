import type { FilterTab } from '@/shared/ui/data-display/filter-tabs'
import { FilterTabs } from '@/shared/ui/data-display/filter-tabs'

import type { LearnFilter } from '../../model'

const STATUS_TABS: FilterTab<LearnFilter>[] = [
  { label: 'Все', value: 'all' },
  { label: 'В процессе', value: 'in_progress' },
  { label: 'Завершённые', value: 'completed' },
  { label: 'Не начатые', value: 'not_started' },
]

interface EnrolledTabsProps {
  selectedFilter: LearnFilter
  onFilterChange: (filter: LearnFilter) => void
  counts: Record<LearnFilter, number>
}

export const EnrolledTabs = ({ selectedFilter, onFilterChange, counts }: EnrolledTabsProps) => (
  <FilterTabs<LearnFilter>
    tabs={STATUS_TABS}
    value={selectedFilter}
    onChange={onFilterChange}
    layoutId="learnTab"
    counts={counts}
  />
)
