import { Box, useTheme } from '@mui/material'
import { useParams } from 'react-router-dom'

import type { NavigationModule } from '@/entities/course-navigation'
import { useSidebarContext } from '@/entities/course-navigation'
import { useIsMobile } from '@/shared/lib'
import { BottomSheet, MotionAside } from '@/shared/ui'

import { sidebarStyles } from './CourseSidebar.styles'
import { SidebarContent } from './sidebar-content'

const SIDEBAR_WIDTH = 240

interface CourseSidebarProps {
  navigation: NavigationModule[]
  open: boolean
  courseTitle: string
  isLoading: boolean
}

export const CourseSidebar = ({
  navigation,
  open,
  courseTitle,
  isLoading = false,
}: CourseSidebarProps) => {
  const theme = useTheme()
  const isMobile = useIsMobile()
  // const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md + 20))
  const { onClose } = useSidebarContext()

  const { courseId = '' } = useParams()

  if (isMobile) {
    return (
      <BottomSheet open={open} onClose={() => onClose?.()}>
        <SidebarContent
          navigation={navigation}
          courseId={courseId}
          courseTitle={courseTitle}
          isLoading={isLoading}
        />
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
        <SidebarContent
          navigation={navigation}
          courseId={courseId}
          courseTitle={courseTitle}
          isLoading={isLoading}
        />
      </Box>
    </MotionAside>
  )
}
