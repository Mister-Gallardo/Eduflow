import type { SxProps, Theme } from '@mui/material/styles'

export const metricksStyles: SxProps<Theme> = {
  mx: 'auto',
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(2, 1fr)',
    md: 'repeat(4, auto)',
  },
  gap: { xs: 3, sm: 6, md: 8 },
  justifyContent: 'center',
  alignItems: 'center',
}
