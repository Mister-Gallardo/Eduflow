import { Box } from '@mui/material'

import { AppSkeleton } from '@/shared/ui/feedback/app-skeleton'

const SKELETON_ROWS = ['100%', '50%', '75%', '65%']

export const StepContentSkeleton = () => (
  <Box sx={{ py: 4 }}>
    <AppSkeleton sx={{ height: 48, width: '70%', mb: 3 }} />

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
      {SKELETON_ROWS.map((width, i) => (
        <AppSkeleton key={i} sx={{ height: 40, width }} />
      ))}
    </Box>

    <Box
      sx={{
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
      }}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <AppSkeleton key={i} sx={{ height: 65, width: { xs: '100%', sm: 140 } }} />
      ))}
    </Box>
  </Box>
)
