import { Box } from '@mui/material'

import { GridBackground } from '@/shared/ui'

import { HeroContent } from './hero-content'
import { HeroMetrics } from './hero-metrics'
import { heroSectionStyles } from './HeroSection.styles'

export const HeroSection = () => (
  <Box component="section" sx={heroSectionStyles}>
    <GridBackground />

    <HeroContent />

    <HeroMetrics />
  </Box>
)
