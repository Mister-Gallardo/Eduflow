import { Box, useTheme } from '@mui/material'
import { motion } from 'motion/react'
import { useParams } from 'react-router-dom'

import { useIsMobile } from '@/shared/lib'
import { BottomSheet } from '@/shared/ui'

import { findActiveModuleId, SidebarActionContext } from '../lib'
import type { NavigationModule } from '../model'

import { sidebarStyles } from './CourseSidebar.styles'
import { SidebarContent } from './SidebarContent'

const SIDEBAR_WIDTH = 260

interface CourseSidebarProps {
  navigation: NavigationModule[]
  open: boolean
  onClose: () => void
  courseTitle: string
  isLoading: boolean
}

export const CourseSidebar = ({
  navigation,
  open,
  onClose,
  courseTitle,
  isLoading = false,
}: CourseSidebarProps) => {
  const theme = useTheme()
  const isMobile = useIsMobile()
  // const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md + 20))

  const { courseId = '', stepId } = useParams()

  const activeModuleId = findActiveModuleId(navigation, stepId)

  if (isMobile) {
    return (
      <BottomSheet open={open} onClose={onClose}>
        <SidebarActionContext.Provider value={{ onClose }}>
          <SidebarContent
            navigation={navigation}
            courseId={courseId}
            activeModuleId={activeModuleId}
            courseTitle={courseTitle}
            isLoading={isLoading}
          />
        </SidebarActionContext.Provider>
      </BottomSheet>
    )
  }

  return (
    <motion.aside
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
        <SidebarContent
          navigation={navigation}
          courseId={courseId}
          activeModuleId={activeModuleId}
          courseTitle={courseTitle}
          isLoading={isLoading}
        />
      </Box>
    </motion.aside>
  )
}
