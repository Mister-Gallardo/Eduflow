import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

import { LoginPrompt } from '@/features/auth'
import { BottomSheet } from '@/shared/ui/overlays/bottom-sheet'

import type { NavigationItem } from '../../model'

import { mobileNavigationItemStyles } from './MobileNavigation.styles'

interface MobileNavigationProps {
  open: boolean
  onClose: () => void
  items: NavigationItem[]
  isAuthenticated: boolean
}

export const MobileNavigation = ({
  open,
  onClose,
  items,
  isAuthenticated,
}: MobileNavigationProps) => {
  const location = useLocation()

  return (
    <BottomSheet open={open} onClose={onClose}>
      <Box sx={{ px: 2, pb: 2, pt: 0.5 }}>
        {!isAuthenticated && (
          <Box sx={{ mb: 2 }}>
            <LoginPrompt fullWidth />
          </Box>
        )}
        <List disablePadding>
          {items.map((item, index) => (
            <ListItemButton
              disableRipple
              key={index}
              component={Link}
              to={item.to}
              onClick={onClose}
              selected={location.pathname === item.to}
              sx={mobileNavigationItemStyles}
            >
              {item.icon && (
                <ListItemIcon sx={{ mr: 1, minWidth: 'auto', color: 'text.primary' }}>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={
                  <Typography component="span" sx={{ fontWeight: 500, fontSize: 14 }}>
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </BottomSheet>
  )
}
