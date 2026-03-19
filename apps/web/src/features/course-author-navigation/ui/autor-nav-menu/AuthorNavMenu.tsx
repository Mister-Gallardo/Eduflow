import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, IconButton, MenuItem, MenuList, Popover, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { paths } from '@/shared/config/paths'

import type { AuthorMenuActiveItem } from '../../model'

import {
  AuthorNavMenuHeaderIconStyles,
  AuthorNavMenuHeaderStyles,
  AuthorNavMenuHeaderTitleStyles,
  AuthorNavMenuItemIconStyles,
  AuthorNavMenuItemsStyles,
  AuthorNavMenuStyles,
} from './AuthorNavMenu.styles'

interface AuthorNavMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  courseTitle: string
  courseId: string
  activeItem: AuthorMenuActiveItem
  stepId?: string
}

const MENU_ITEMS = [
  {
    key: 'edit',
    icon: <EditOutlinedIcon sx={{ fontSize: 18 }} />,
    label: 'Редактировать шаг',
    subtitle: 'Контент и название',
  },
  {
    key: 'settings',
    icon: <SettingsOutlinedIcon sx={{ fontSize: 18 }} />,
    label: 'Настройки курса',
    subtitle: 'Публикация и параметры',
  },
  {
    key: 'preview',
    icon: <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />,
    label: 'Предпросмотр',
    subtitle: 'Как видят студенты',
  },
] as const

export const AuthorNavMenu = ({
  anchorEl,
  open,
  onClose,
  courseTitle,
  courseId,
  activeItem,
  stepId,
}: AuthorNavMenuProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      disableScrollLock
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      slotProps={{
        paper: {
          sx: AuthorNavMenuStyles,
        },
      }}
    >
      <Box sx={AuthorNavMenuHeaderStyles}>
        <Box sx={AuthorNavMenuHeaderIconStyles}>
          <MenuBookOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={AuthorNavMenuHeaderTitleStyles}>
            {courseTitle}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Режим автора
          </Typography>
        </Box>

        <IconButton size="small" onClick={onClose} aria-label="Закрыть меню" sx={{ flexShrink: 0 }}>
          <CloseOutlinedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <MenuList
        autoFocusItem={open}
        variant="menu"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 2,
          py: 1.5,
          gap: 1,
          outline: 'none', // убираем системный контур
        }}
      >
        {MENU_ITEMS.map(({ key, icon, label, subtitle }) => {
          const isActive = key !== 'settings' && key === activeItem

          return (
            <MenuItem
              key={key}
              component={Link}
              to={
                key === 'edit'
                  ? '/'
                  : key === 'settings'
                    ? paths.teach()
                    : paths.course.view(courseId, stepId)
              }
              onClick={onClose}
              sx={{
                ...AuthorNavMenuItemsStyles,
                bgcolor: isActive ? 'primary.dark' : 'transparent',
                color: isActive ? '#fff' : 'text.primary',
                '&:hover': {
                  bgcolor: isActive ? 'primary.dark' : 'action.hover',
                },
                '&.Mui-focusVisible': {
                  bgcolor: isActive ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              <Box
                sx={{
                  ...AuthorNavMenuItemIconStyles,
                  bgcolor: isActive ? 'rgba(255,255,255,0.15)' : 'action.hover',
                  color: isActive ? '#fff' : 'text.secondary',
                }}
              >
                {icon}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: 'inherit',
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: isActive ? 'rgba(255,255,255,0.75)' : 'text.secondary',
                  }}
                >
                  {subtitle}
                </Typography>
              </Box>
            </MenuItem>
          )
        })}
      </MenuList>
    </Popover>
  )
}
