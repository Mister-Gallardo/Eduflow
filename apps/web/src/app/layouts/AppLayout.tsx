import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { paths } from '@/shared/config/paths'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { Logo } from '@/shared/ui/data-display/logo'
import { PageContainer } from '@/shared/ui/layout/page-container'
import {
  Header,
  HeaderActions,
  HeaderNavigation,
  MobileNavigation,
  useHeaderActions,
} from '@/widgets/header'

const navigationItems = [
  {
    label: 'Каталог',
    to: paths.home(),
  },
  {
    label: 'Моё обучение',
    to: paths.learn.root(),
  },
  {
    label: 'Преподавание',
    icon: <SchoolOutlinedIcon fontSize="small" />,
    to: paths.teach.root(),
  },
]

export const AppLayout = () => {
  const isMobile = useIsMobile()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const headerActions = useHeaderActions({
    withMobileMenu: true,
    mobileMenuOpen,
    toggleMobileMenu: () => setMobileMenuOpen((p) => !p),
  })

  return (
    <>
      <Header
        leftSlot={<Logo size="small" isClickable={true} isAnimated={false} showText={!isMobile} />}
        centerSlot={<HeaderNavigation items={navigationItems} />}
        rightSlot={<HeaderActions actions={headerActions} edgeToEnd={true} />}
        containerVariant="fixed"
      />

      <Box component="main" sx={{ overflowX: 'clip' }}>
        <PageContainer variant="fixed">
          <Outlet />
        </PageContainer>
      </Box>

      <MobileNavigation
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navigationItems}
      />
    </>
  )
}
