import { Box, Button, Chip, Typography, useTheme } from '@mui/material'
import { AnimatePresence } from 'motion/react'

import { MotionBox } from '@/shared/ui/animations/motion'

import { filterTabButtonStyles, filterTabsContainerStyles } from './FilterTabs.styles'
import type { FilterTab } from './types'

interface FilterTabsProps<T extends string> {
  tabs: FilterTab<T>[]
  value: T
  onChange: (value: T) => void
  layoutId: string
  counts?: Partial<Record<T, number>>
}

export const FilterTabs = <T extends string>({
  tabs,
  value,
  onChange,
  layoutId,
  counts,
}: FilterTabsProps<T>) => {
  const theme = useTheme()

  return (
    <Box sx={filterTabsContainerStyles}>
      {tabs.map((tab) => {
        const isActive = value === tab.value
        const count = counts?.[tab.value]

        return (
          <Button
            disableRipple
            key={tab.value}
            onClick={() => onChange(tab.value)}
            sx={filterTabButtonStyles}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isActive && (
                <MotionBox
                  layoutId={layoutId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 3,
                    bgcolor: theme.palette.primary.main,
                    zIndex: 'background',
                  }}
                />
              )}
            </AnimatePresence>

            <Typography
              variant="body2"
              component="span"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                color: isActive ? theme.palette.common.white : theme.palette.text.secondary,
                transition: 'color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
              }}
            >
              {tab.label}

              {count !== undefined && (
                <Chip
                  label={count}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    bgcolor: isActive ? 'rgba(255,255,255,0.2)' : 'action.hover',
                    color: isActive ? theme.palette.common.white : theme.palette.text.secondary,
                    transition: 'all 0.2s ease',
                  }}
                />
              )}
            </Typography>
          </Button>
        )
      })}
    </Box>
  )
}
