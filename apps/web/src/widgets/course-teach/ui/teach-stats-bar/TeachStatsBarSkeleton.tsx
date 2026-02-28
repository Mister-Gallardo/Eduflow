import { Box } from '@mui/material'

import { AppSkeleton } from '@/shared/ui/feedback/app-skeleton'

import { statCardStyles } from './TeachStatsBar.styles'

export const TeachStatBarSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
    }}
  >
    {Array.from({ length: 4 }).map((_, index) => (
      <Box
        key={index}
        sx={{
          ...statCardStyles,
          borderColor: 'divider',
        }}
      >
        <AppSkeleton variant="rectangular" sx={{ width: 36, height: 36, borderRadius: 2 }} />
        <Box>
          <AppSkeleton sx={{ width: 80, mb: -0.25 }} />
          <AppSkeleton sx={{ width: 140 }} />
        </Box>
      </Box>
    ))}
  </Box>
)
