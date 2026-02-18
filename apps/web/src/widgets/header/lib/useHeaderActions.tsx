import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'

import { useIsMobile } from '@/shared/lib/useIsMobile'

interface WithMobileMenu {
  withMobileMenu: true
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
}

interface WithoutMobileMenu {
  withMobileMenu: false
}

type UseHeaderActionsProps = WithMobileMenu | WithoutMobileMenu

export const useHeaderActions = (props: UseHeaderActionsProps) => {
  const isMobile = useIsMobile()

  const baseActions = [
    {
      icon: <NotificationsOutlinedIcon />,
      onClick: () => {
        console.info('pressed')
      },
      'aria-label': 'Уведомления',
    },
    {
      icon: <AccountCircleOutlinedIcon />,
      onClick: () => {
        console.info('pressed')
      },
      'aria-label': 'Профиль пользователя',
    },
  ]

  if (!props.withMobileMenu || !isMobile) {
    return baseActions
  }

  return [
    ...baseActions,
    {
      icon: props.mobileMenuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />,
      onClick: props.toggleMobileMenu,
      'aria-label': 'Меню навигации',
    },
  ]
}
