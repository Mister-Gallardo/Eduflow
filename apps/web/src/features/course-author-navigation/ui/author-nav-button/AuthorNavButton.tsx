import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import type { AuthorNavButtonProps } from '../../model'
import { AuthorNavMenu } from '../autor-nav-menu'

import { AuthorNavButtonStyles } from './AuthorNavButton.styles'

export const AuthorNavButton = ({
  courseId,
  courseTitle,
  activeItem,
  stepId,
}: AuthorNavButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(anchorEl)

  const isExpanded = isHovered && !menuOpen

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(menuOpen ? null : event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        component="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Редактировать"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        sx={AuthorNavButtonStyles}
      >
        <EditOutlinedIcon sx={{ fontSize: 22 }} />

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500, pl: 1, color: 'inherit' }}>
                Редактировать
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      <AuthorNavMenu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        courseTitle={courseTitle}
        courseId={courseId}
        activeItem={activeItem}
        stepId={stepId}
      />
    </>
  )
}
