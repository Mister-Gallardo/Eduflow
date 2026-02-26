import { Box, Button, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Link, useLocation } from 'react-router-dom'

import type { NavigationItem } from '../../model'

interface HeaderNavigationProps {
  items: NavigationItem[]
}

const NavigationButton = ({ label, icon, to }: NavigationItem) => {
  const { pathname } = useLocation()

  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to))

  return (
    <Button
      disableRipple
      component={Link}
      to={to}
      sx={{
        color: 'text.primary',
        backgroundColor: (theme) =>
          isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
        borderRadius: 3,
        px: 2,
        py: 1,
        transition: 'all 0.2s ease-in-out',

        ':hover': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
        },
      }}
    >
      {icon && (
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
          {icon}
        </Box>
      )}
      <Typography
        component="span"
        sx={{
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: '0.01rem',
        }}
      >
        {label}
      </Typography>
    </Button>
  )
}

export const HeaderNavigation = ({ items }: HeaderNavigationProps) => (
  <Box
    component="nav"
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    {items.map((item, index) => (
      <NavigationButton key={index} {...item} />
    ))}
  </Box>
)
