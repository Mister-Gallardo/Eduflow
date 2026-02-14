import { Box } from '@mui/material'

import { MySkeleton } from '@/shared/ui'

export const LearnMainSkeleton = () => (
  <Box sx={{ py: 4 }}>
    {/* Заголовок */}
    <MySkeleton sx={{ height: 48, width: '70%', mb: 3 }} />

    {/* Текстовые блоки */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <MySkeleton sx={{ height: 40, width: '100%' }} />
      <MySkeleton sx={{ height: 40, width: '95%' }} />
      <MySkeleton sx={{ height: 40, width: '50%' }} />
      <MySkeleton sx={{ height: 40, width: '75%' }} />
      <MySkeleton sx={{ height: 40, width: '65%' }} />
    </Box>
  </Box>
)
