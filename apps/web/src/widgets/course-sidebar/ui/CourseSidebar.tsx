import { Box, useTheme } from '@mui/material'

import { useSidebarContext } from '@/entities/course-navigation'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { MotionAside } from '@/shared/ui/animations/motion'
import { BottomSheet } from '@/shared/ui/overlays/bottom-sheet'

import { sidebarStyles } from './CourseSidebar.styles'
import { SidebarContent } from './sidebar-content'

const SIDEBAR_WIDTH = 240

export const CourseSidebar = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const { open, onClose } = useSidebarContext()

  if (isMobile) {
    return (
      <BottomSheet open={open} onClose={() => onClose()}>
        <SidebarContent />
      </BottomSheet>
    )
  }

  return (
    <MotionAside
      initial={false}
      animate={{
        width: open ? SIDEBAR_WIDTH : 0,
        opacity: open ? 1 : 0,
        display: open ? 'block' : 'none',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      aria-label="Навигация по курсу"
      style={{
        borderRight: `1px solid ${theme.palette.divider}`,
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          ...sidebarStyles,
          width: SIDEBAR_WIDTH,
        }}
      >
        <SidebarContent />
      </Box>
    </MotionAside>
  )
}
