import { Divider } from '@mui/material'
import type { ComponentProps } from 'react'

interface FullPageDividerProps {
  orientation?: ComponentProps<typeof Divider>['orientation']
}

export const FullPageDivider = ({ orientation = 'horizontal' }: FullPageDividerProps) => (
  <Divider
    orientation={orientation}
    sx={{
      width: '100vw',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  />
)
