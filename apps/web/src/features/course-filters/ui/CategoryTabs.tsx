import { Box, Button, Typography, useTheme } from '@mui/material'
import { AnimatePresence } from 'motion/react'

import { MotionBox } from '@/shared/ui'

import { categoryTabsStyles, categoryTabStyles } from './CourseFilters.styles'

interface CategoryTabsProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const CATEGORIES = [
  { label: 'Часто выбирают', value: 'popular' },
  { label: 'Разработка', value: 'development' },
  { label: 'Дизайн', value: 'design' },
  { label: 'Аналитика', value: 'analytics' },
  { label: 'Маркетинг', value: 'marketing' },
]

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const theme = useTheme()

  return (
    <Box sx={categoryTabsStyles}>
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.value
        return (
          <Button
            disableRipple
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            sx={categoryTabStyles}
          >
            <AnimatePresence>
              {isActive && (
                <MotionBox
                  layoutId="activeTabBg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
              sx={{
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                color: isActive ? '#fff' : 'text.secondary',
                transition: 'color 0.2s ease',
              }}
            >
              {cat.label}
            </Typography>
          </Button>
        )
      })}
    </Box>
  )
}
