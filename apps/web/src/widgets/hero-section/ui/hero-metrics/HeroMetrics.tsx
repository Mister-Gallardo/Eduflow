import { Box, useTheme } from '@mui/material'

import { MetricBlock } from '@/shared/ui/data-display/metric-block'
import { getMetrics } from '@/widgets/hero-section/lib'

import { metricksStyles } from './HeroMetrics.styles'

export const HeroMetrics = () => {
  const theme = useTheme()

  const metrics = getMetrics(theme.palette.customColors)

  return (
    <Box sx={metricksStyles}>
      {metrics.map((metric, index) => (
        <MetricBlock key={metric.label} metric={metric} index={index} />
      ))}
    </Box>
  )
}
