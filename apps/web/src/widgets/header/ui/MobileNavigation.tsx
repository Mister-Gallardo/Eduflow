import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material'
import { BottomSheet } from '@shared/ui'
import { Link, useLocation } from 'react-router-dom'

import type { NavigationItem } from '../model'

interface MobileNavigationProps {
  open: boolean
  onClose: () => void
  items: NavigationItem[]
}

const ListItemButtonStyles: SxProps<Theme> = {
  py: 1.75,
  px: 2,
  mb: 0.5,
  borderRadius: 2,
  '&.Mui-selected': {
    backgroundColor: 'action.selected',
  },
}

export const MobileNavigation = ({ open, onClose, items }: MobileNavigationProps) => {
  const location = useLocation()

  return (
    <BottomSheet open={open} onClose={onClose}>
      <List disablePadding sx={{ px: 2 }}>
        {items.map((item, index) => (
          <ListItemButton
            disableRipple
            key={index}
            component={Link}
            to={item.to}
            onClick={onClose}
            selected={location.pathname === item.to}
            sx={ListItemButtonStyles}
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
    </BottomSheet>
  )
}
