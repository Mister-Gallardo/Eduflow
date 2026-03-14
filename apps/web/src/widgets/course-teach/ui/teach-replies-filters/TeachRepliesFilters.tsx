import { alpha, Box, Button, useTheme } from '@mui/material'
import { motion } from 'motion/react'

import { SearchInput } from '@/shared/ui/inputs/search-input'

import type { StatusFilter } from '../../model'

const STATUS_BUTTONS: { label: string; value: StatusFilter }[] = [
  { label: 'Все', value: 'ALL' },
  { label: 'Ожидают', value: 'PENDING' },
  { label: 'Проверено', value: 'REVIEWED' },
]

export interface TeachRepliesFiltersProps {
  search: string
  onSearch: (value: string) => void
  status: string
  onStatusChange: (status: StatusFilter) => void
}

export const TeachRepliesFilters = ({
  search,
  onSearch,
  status,
  onStatusChange,
}: TeachRepliesFiltersProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
      }}
    >
      <SearchInput
        value={search}
        onChange={onSearch}
        placeholder="Поиск по имени, курсу или заданию..."
        sx={{
          flex: 1,
          minWidth: { xs: '100%', md: 320 },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
        }}
      >
        {STATUS_BUTTONS.map((btn) => {
          const isActive = status === btn.value

          return (
            <Button
              disableRipple
              key={btn.value}
              component={motion.button}
              layout
              size="small"
              onClick={() => onStatusChange(btn.value)}
              animate={{
                backgroundColor: isActive
                  ? theme.palette.grey[900]
                  : alpha(theme.palette.primary.main, 0.04),
                color: isActive ? theme.palette.common.white : theme.palette.text.primary,
              }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              sx={{
                py: { xs: 1, md: 0 },
                borderRadius: 3,
                fontWeight: 500,
                fontSize: '0.75rem',
                minWidth: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: isActive
                    ? 'inherit'
                    : (theme) => alpha(theme.palette.primary.main, 0.08) + '!important',
                },
              }}
            >
              {btn.label}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}
