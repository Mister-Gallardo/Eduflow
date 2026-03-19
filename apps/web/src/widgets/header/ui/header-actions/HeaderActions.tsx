import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { LoginPrompt } from '@/features/auth'
import { trpc } from '@/shared/api/trpc'
import { paths } from '@/shared/config/paths'
import { FullPageLoader } from '@/shared/ui/feedback/full-page-loader'

import { actionButtonStyles, headerActionsStyles } from './HeaderActions.styles'

interface HeaderActions {
  edgeToEnd?: boolean
  showNotificationButton?: boolean
  showAccountButton?: boolean
  showAuthButton?: boolean
  isUserLoading?: boolean
}

interface WithMobileMenu {
  showMobileMenuButton?: true
  mobileMenuOpen: boolean
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}

interface WithoutMobileMenu {
  showMobileMenuButton?: false | undefined
}

interface HeaderActionButtonProps {
  icon: React.ReactNode
  onClick: () => void
  'aria-label': string
}

type HeaderActionsProps = HeaderActions & (WithMobileMenu | WithoutMobileMenu)

export const HeaderActions = (props: HeaderActionsProps) => {
  if (props.isUserLoading) return null

  const actions = (
    <>
      {props.showNotificationButton && (
        <HeaderActionButton
          icon={<NotificationsOutlinedIcon />}
          onClick={() => {
            console.info('pressed notifications')
          }}
          aria-label="Уведомления"
        />
      )}
      {props.showAccountButton && <AccountMenu />}
      {props.showMobileMenuButton && (
        <HeaderActionButton
          icon={props.mobileMenuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
          onClick={() => props.setMobileMenuOpen((p) => !p)}
          aria-label="Меню навигации"
        />
      )}
    </>
  )

  return (
    <Box
      sx={{
        ...headerActionsStyles,
        ...(props.edgeToEnd && {
          '& > .icon-button:last-child': {
            mr: '-10px',
          },
        }),
      }}
    >
      {props.showAuthButton ? <LoginPrompt /> : actions}
    </Box>
  )
}

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutMutation = trpc.auth.logout.useMutation({
    onSettled: () => {
      // После logout не рефетчим все запросы, чтобы не ловить 401/refresh race.
      queryClient.clear()
    },
  })

  const performLogout = () => {
    handleClose()
    void navigate(paths.home(), { replace: true })
    logoutMutation.mutate()
  }

  return (
    <>
      {logoutMutation.isPending && <FullPageLoader />}

      <IconButton
        className="icon-button"
        onClick={handleClick}
        disabled={logoutMutation.isPending}
        aria-label="Профиль пользователя"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        size="medium"
        sx={actionButtonStyles}
      >
        <Avatar
          sx={{ bgcolor: 'secondary.main', width: 26, height: 26, fontSize: 18, fontWeight: 500 }}
        >
          A
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 0.5,
              minWidth: 220,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              '& .MuiMenuItem-root': {
                py: 1.5,
                borderRadius: 1,

                gap: 0,
              },
            },
          },
        }}
      >
        <MenuItem component={Link} to={paths.account()}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <Typography variant="body2" fontWeight={500}>
            Личный кабинет
          </Typography>
        </MenuItem>

        <Divider sx={{ my: 0.5, mx: 1 }} />

        <MenuItem
          onClick={performLogout}
          disabled={logoutMutation.isPending}
          sx={{
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.08)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" fontWeight={500}>
            Выйти
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

const HeaderActionButton = ({
  icon,
  onClick,
  'aria-label': ariaLabel,
}: HeaderActionButtonProps) => {
  return (
    <IconButton
      className="icon-button"
      onClick={onClick}
      aria-label={ariaLabel}
      size="medium"
      sx={actionButtonStyles}
    >
      {icon}
    </IconButton>
  )
}
