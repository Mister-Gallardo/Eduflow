import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import type { NavigationItem } from '../../model'

interface HeaderNavigationProps {
  items: NavigationItem[]
}

const NavigationButton = ({ label, icon, to }: NavigationItem) => {
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        color: 'text.primary',
        borderRadius: 3,
        px: 2,
        py: 1,
      }}
    >
      {icon && (
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
          {icon}
        </Box>
      )}
      <Typography component="span" sx={{ fontWeight: 500, fontSize: 14 }}>
        {label}
      </Typography>
    </Button>
  )
}

export const HeaderNavigation = ({ items }: HeaderNavigationProps) => {
  return (
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
}
