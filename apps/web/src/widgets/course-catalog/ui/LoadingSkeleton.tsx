import { Box } from '@mui/material'

import { useIsMobile } from '@/shared/lib'
import { MySkeleton } from '@/shared/ui'

export const LoadingSkeleton = () => {
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
        <MySkeleton
          key={i}
          variant="rounded"
          sx={{
            height: 310,
            borderRadius: 4,
          }}
        />
      ))}
    </Box>
  )
}
