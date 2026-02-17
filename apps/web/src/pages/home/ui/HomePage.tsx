import { Box } from '@mui/material'
import { HeroSection } from '@widgets/hero-section'

import { FullPageDivider } from '@/shared/ui'
import { CourseCatalog } from '@/widgets/course-catalog'

export const HomePage = () => (
  <Box>
    <HeroSection />

    <FullPageDivider />

    <CourseCatalog />
  </Box>
)
