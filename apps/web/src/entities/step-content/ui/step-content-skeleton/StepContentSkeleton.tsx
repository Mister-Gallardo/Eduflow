import { Box } from '@mui/material'

import { AppSkeleton } from '@/shared/ui'

const SKELETON_ROWS = ['100%', '95%', '50%', '75%', '65%']

export const StepContentSkeleton = () => (
  <Box sx={{ py: 4 }}>
    {/* Заголовок */}
    <AppSkeleton sx={{ height: 48, width: '70%', mb: 3 }} />

    {/* Текстовые блоки */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {SKELETON_ROWS.map((width, i) => (
        <AppSkeleton key={i} sx={{ height: 40, width }} />
      ))}
    </Box>
  </Box>
)
