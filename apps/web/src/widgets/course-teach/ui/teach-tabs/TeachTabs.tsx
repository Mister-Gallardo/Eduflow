import { Box, Button, Chip, Typography } from '@mui/material'
import { AnimatePresence } from 'motion/react'

import { MotionBox } from '@/shared/ui/animations/motion'

import type { TeachTab } from '../../model'

import {
  teachTabChipStyles,
  teachTabLabelStyles,
  teachTabsStyles,
  teachTabStyles,
  teachTabUnderlineStyles,
} from './TeachTabs.styles'

interface TeachTabsProps {
  value: TeachTab
  onChange: (value: TeachTab) => void
  reviewCount: number
}

export const TeachTabs = ({ value, onChange, reviewCount }: TeachTabsProps) => {
  const tabs = [
    { value: 'courses' as const, label: 'Мои курсы' },
    { value: 'replies' as const, label: 'Проверка ответов', count: reviewCount },
  ]

  return (
    <Box sx={teachTabsStyles}>
      {tabs.map((tab) => {
        const isActive = value === tab.value

        return (
          <Button
            key={tab.value}
            disableRipple
            onClick={() => onChange(tab.value)}
            variant="text"
            sx={{
              ...teachTabStyles,
              color: isActive ? 'text.primary' : 'text.secondary',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isActive && (
                <MotionBox
                  layoutId="teachTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
                  sx={teachTabUnderlineStyles}
                />
              )}
            </AnimatePresence>

            <Typography variant="body2" sx={teachTabLabelStyles}>
              {tab.label}
            </Typography>

            {tab.count !== undefined && tab.count > 0 && (
              <Chip label={tab.count} size="small" sx={teachTabChipStyles} />
            )}
          </Button>
        )
      })}
    </Box>
  )
}
