import { alpha, Skeleton, type SxProps, useTheme } from '@mui/material'
import type { ComponentProps } from 'react'

interface AppSkeletonProps {
  variant?: ComponentProps<typeof Skeleton>['variant']
  sx?: SxProps
}

export const AppSkeleton = ({ variant = 'text', sx = {} }: AppSkeletonProps) => {
  const theme = useTheme()

  return (
    <Skeleton
      variant={variant}
      animation="wave"
      sx={{
        ...sx,
        bgcolor: alpha(theme.palette.primary.main, 0.05),
      }}
    />
  )
}
