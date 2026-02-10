import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { paths } from '@/shared/config'
import { useIsMobile } from '@/shared/lib'
import { Logo, PageContainer } from '@/shared/ui'
import { Header, HeaderActions, HeaderNavigation, MobileNavigation } from '@/widgets/header'

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

  const headerActions = [
    {
      icon: <NotificationsOutlinedIcon />,
      onClick: () => {
        // TODO: Implement notifications functionality
      },
      'aria-label': 'Уведомления',
    },
    {
      icon: <AccountCircleOutlinedIcon />,
      onClick: () => {
        // TODO: Implement profile menu
      },
      'aria-label': 'Профиль пользователя',
    },
    isMobile && {
      icon: mobileMenuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />,
      onClick: () => {
        setMobileMenuOpen((prev) => !prev)
      },
      'aria-label': 'Меню навигации',
    },
  ]

  return (
    <>
      <Header
        containerVariant="fixed"
        leftSlot={<Logo size="small" isClickable={true} isAnimated={false} showText={!isMobile} />}
        centerSlot={<HeaderNavigation items={navigationItems} />}
        rightSlot={<HeaderActions actions={headerActions.filter((action) => action !== false)} />}
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
