import { alpha, Skeleton, useTheme } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ComponentProps } from 'react'

interface AppSkeletonProps {
  variant?: ComponentProps<typeof Skeleton>['variant']
  sx?: SxProps<Theme>
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
