import { alpha, Skeleton, type SxProps, useTheme } from '@mui/material'
import type { ComponentProps } from 'react'

interface MySkeletonProps {
  variant?: ComponentProps<typeof Skeleton>['variant']
  sx?: SxProps
}

export const MySkeleton = ({ variant = 'text', sx = {} }: MySkeletonProps) => {
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
