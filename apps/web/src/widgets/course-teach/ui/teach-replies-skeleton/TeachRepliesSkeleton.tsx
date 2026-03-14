import { Box } from '@mui/material'

import { AppSkeleton } from '@/shared/ui/feedback/app-skeleton'

const SkeletonReplyCard = () => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      p: { xs: 2.5, md: 3 },
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      backgroundColor: 'background.paper',
    }}
  >
    <AppSkeleton variant="circular" sx={{ width: 40, height: 40, flexShrink: 0 }} />
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <AppSkeleton sx={{ width: '30%', height: 20 }} />
      <AppSkeleton sx={{ width: '50%', height: 14 }} />
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <AppSkeleton sx={{ width: 60, height: 14 }} />
      <AppSkeleton sx={{ width: 24, height: 24, borderRadius: '50%' }} />
    </Box>
  </Box>
)

export const TeachRepliesSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {/* Header Skeletons */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
      <AppSkeleton sx={{ width: 150, height: 24 }} />
      <AppSkeleton sx={{ width: 30, height: 20, borderRadius: 2 }} />
    </Box>

    {/* Body Skeletons */}
    {Array.from({ length: 5 }, (_, i) => (
      <SkeletonReplyCard key={i} />
    ))}
  </Box>
)
