import { Box } from '@mui/material'

import { AppSkeleton } from '@/shared/ui/feedback/app-skeleton'

const SkeletonCard = () => (
  <Box
    sx={{
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'background.paper',
    }}
  >
    <AppSkeleton
      variant="rectangular"
      sx={{ width: '100%', height: { xs: 160, sm: 180 }, flexShrink: 0 }}
    />
    <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <AppSkeleton sx={{ width: '60%', height: 24 }} />
      <AppSkeleton sx={{ width: '40%', height: 16 }} />
      <Box sx={{ mt: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <AppSkeleton sx={{ width: '30%', height: 14 }} />
        <AppSkeleton sx={{ width: '20%', height: 14 }} />
      </Box>
    </Box>
  </Box>
)

export const TeachCoursesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  )
}
