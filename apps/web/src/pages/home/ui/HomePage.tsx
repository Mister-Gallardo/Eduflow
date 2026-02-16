import { Box, Divider, useTheme } from '@mui/material'

import { GridBackground } from '@/shared/ui'
import { CourseCatalog } from '@/widgets/course-catalog'

import { getStats } from '../lib'

import { HeroSection } from './hero-section'
import { sectionStyles, statsStyles } from './HomePage.styles'
import { StatBlock } from './stat-block'

export const HomePage = () => {
  const theme = useTheme()

  const stats = getStats(theme.palette.customColors)

  return (
    <Box>
      <Box
        component="section"
        sx={{
          ...sectionStyles,
          height: { xs: 'auto', md: `calc(100vh - ${theme.layout.headerHeight.desktop}px)` },
        }}
      >
        <GridBackground />

        <HeroSection />

        <Box sx={statsStyles}>
          {stats.map((stat, index) => (
            <StatBlock key={stat.label} stat={stat} index={index} />
          ))}
        </Box>
      </Box>

      <Divider
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <CourseCatalog />
    </Box>
  )
}
