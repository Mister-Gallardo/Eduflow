import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { paths } from '../../shared/config'
import { Logo, PageContainer } from '../../shared/ui'
import { Header, HeaderActions, HeaderNavigation } from '../../widgets/header'

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
]

export const AppLayout = () => {
  return (
    <>
      <Header
        containerVariant="fixed"
        leftSlot={<Logo size="small" isClickable={true} isAnimated={false} />}
        centerSlot={<HeaderNavigation items={navigationItems} />}
        rightSlot={<HeaderActions actions={headerActions} />}
      />
      <Box component="main">
        <PageContainer variant="fixed">
          <Outlet />
        </PageContainer>
      </Box>
    </>
  )
}
