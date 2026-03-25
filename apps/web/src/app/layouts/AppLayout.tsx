import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useGetMe } from '@/entities/user'
import { paths } from '@/shared/config/paths'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { Logo } from '@/shared/ui/data-display/logo'
import { PageContainer } from '@/shared/ui/layout/page-container'
import { Header, HeaderActions, HeaderNavigation, MobileNavigation } from '@/widgets/header'

export const AppLayout = () => {
  const isMobile = useIsMobile()

  const { user, isUserLoading } = useGetMe()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationItems = [
    {
      label: 'Каталог',
      to: paths.home(),
    },
    {
      label: 'Моё обучение',
      to: paths.learn(),
    },
    ...(user?.role === 'TEACHER'
      ? [
          {
            label: 'Преподавание',
            icon: <SchoolOutlinedIcon fontSize="small" />,
            to: paths.teach(),
          },
        ]
      : []),
  ]

  return (
    <>
      <Header
        leftSlot={<Logo size="small" isClickable={true} isAnimated={false} showText={!isMobile} />}
        centerSlot={<HeaderNavigation items={navigationItems} />}
        rightSlot={
          <HeaderActions
            edgeToEnd={true}
            showNotificationButton={true}
            showAccountButton={true}
            showMobileMenuButton={isMobile}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            showAuthButton={!user}
            isUserLoading={isUserLoading}
          />
        }
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
        isAuthenticated={!!user && !isUserLoading}
      />
    </>
  )
}
