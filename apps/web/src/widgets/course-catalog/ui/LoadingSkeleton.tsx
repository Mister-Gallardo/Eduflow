import { alpha, Box, Skeleton, useTheme } from '@mui/material'

import { useIsMobile } from '@/shared/lib'

export const LoadingSkeleton = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 3,
      }}
    >
      {Array.from({ length: isMobile ? 1 : 6 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          animation="wave"
          sx={{
            height: 310,
            borderRadius: 4,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
          }}
        />
      ))}
    </Box>
  )
}
