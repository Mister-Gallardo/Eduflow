import { Box } from '@mui/material'

import { FullPageDivider } from '@/shared/ui/layout/full-page-divider'
import { CourseCatalog } from '@/widgets/course-catalog'
import { HeroSection } from '@/widgets/hero-section'

export const HomePage = () => (
  <Box>
    <HeroSection />

    <FullPageDivider />

    <CourseCatalog />
  </Box>
)
