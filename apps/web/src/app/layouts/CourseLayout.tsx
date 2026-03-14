import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { SidebarContext, useCourseNavigation } from '@/entities/course-navigation'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { Result404 } from '@/shared/ui/feedback/result-404'
import { PageContainer } from '@/shared/ui/layout/page-container'
import { CourseSidebar } from '@/widgets/course-sidebar'
import { Header, HeaderActions, LearnHeaderLeft } from '@/widgets/header'
import { StepsPanel } from '@/widgets/steps-panel'

export const CourseLayout = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!isMobile)

  const { state, context, navigation } = useCourseNavigation()

  return (
    <>
      <Header
        leftSlot={<LearnHeaderLeft sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        rightSlot={
          <HeaderActions edgeToEnd={true} showNotificationButton={true} showAccountButton={true} />
        }
        containerVariant="fluid"
      />

      {state.shouldShow404 ? (
        <Result404 />
      ) : (
        <Box
          sx={{
            display: 'flex',
            height: {
              xs: `calc(100dvh - ${theme.layout.headerHeight.mobile}px)`,
              md: `calc(100vh - ${theme.layout.headerHeight.desktop}px)`,
            },
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <SidebarContext.Provider
            value={{
              navigation: navigation,
              courseId: state.courseId,
              courseTitle: state.courseTitle,
              activeModuleId: state.activeModuleId,
              activeLessonId: state.activeLesson?.id ?? null,
              open: sidebarOpen,
              onClose: () => setSidebarOpen(false),
              isLoading: state.isCourseNavigationLoading,
            }}
          >
            <CourseSidebar />
          </SidebarContext.Provider>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {(state.activeLesson?.steps.length ?? state.isCourseNavigationLoading) && (
              <StepsPanel
                courseId={state.courseId}
                lesson={state.activeLesson}
                currentStepId={state.stepId}
                isLoading={state.isCourseNavigationLoading}
              />
            )}

            <Box
              component="main"
              sx={{
                flex: 1,
                overflowY: 'auto',
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
              }}
            >
              <PageContainer variant="narrow">
                <Outlet context={context} />
              </PageContainer>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
