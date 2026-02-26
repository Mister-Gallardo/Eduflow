import { Box } from '@mui/material'

import { AppSkeleton } from '@/shared/ui/feedback/app-skeleton'

const SkeletonCard = () => (
  <Box
    sx={{
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      border: '1px solid',
      borderColor: 'divider',
      height: 185,
    }}
  >
    <AppSkeleton
      variant="rectangular"
      sx={{ width: { xs: 160, sm: 200 }, height: '100%', flexShrink: 0 }}
    />
    <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <AppSkeleton sx={{ width: '40%', height: 24 }} />
      <AppSkeleton sx={{ width: '70%', height: 20 }} />
      <AppSkeleton sx={{ width: '50%', height: 20 }} />
      <Box
        sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <AppSkeleton sx={{ width: '30%', height: 14 }} />
        <AppSkeleton variant="rounded" sx={{ width: 100, height: 32, borderRadius: 2 }} />
      </Box>
    </Box>
  </Box>
)

export const LibrarySkeleton = () => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
      gap: 2.5,
    }}
  >
    {Array.from({ length: 8 }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </Box>
)
