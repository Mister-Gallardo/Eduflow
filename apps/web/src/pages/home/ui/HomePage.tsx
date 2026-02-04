import { Box, type SxProps, type Theme, useTheme } from '@mui/material'

import { GridBackground } from '@/shared/ui'

import { getStats } from '../lib'

import { HeroSection } from './HeroSection'
import { StatBlock } from './StatBlock'

const sectionStyles: SxProps<Theme> = {
  width: '100%',
  height: { xs: 'auto', md: 'calc(100vh - 60px)' },
  minHeight: 700,
  maxHeight: { md: 1000 },
  py: { xs: 4, md: 0 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: { xs: 6, md: 10 },
}

const statsStyles: SxProps<Theme> = {
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

export const HomePage = () => {
  const theme = useTheme()

  const stats = getStats(theme.palette.customColors)

  return (
    <Box component="section" sx={sectionStyles}>
      <GridBackground />

      <HeroSection />

      <Box sx={statsStyles}>
        {stats.map((stat, index) => (
          <StatBlock key={stat.label} stat={stat} index={index} />
        ))}
      </Box>
    </Box>
  )
}
