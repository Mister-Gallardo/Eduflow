import { Box, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { SidebarContext, useCourseNavigation } from '@/entities/course-navigation'
import { StepContentSkeleton } from '@/entities/step-content'
import { useIsMobile } from '@/shared/lib'
import { PageContainer, Result404 } from '@/shared/ui'
import { CourseSidebar } from '@/widgets/course-sidebar'
import { Header, HeaderActions, LearnHeaderLeft, useHeaderActions } from '@/widgets/header'
import { StepsPanel } from '@/widgets/steps-panel'

export const LearnLayout = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const { pathname } = useLocation()

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!isMobile)

  const { state, context, navigation } = useCourseNavigation()

  const headerActions = useHeaderActions({ withMobileMenu: false })

  const mainContentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    mainContentRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header
        leftSlot={<LearnHeaderLeft sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        rightSlot={<HeaderActions actions={headerActions} edgeToEnd={true} />}
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
              onClose: () => setSidebarOpen(false),
              activeModuleId: state.activeModuleId,
              activeLessonId: state.activeLesson?.id,
            }}
          >
            <CourseSidebar
              navigation={navigation}
              open={sidebarOpen}
              courseTitle={state.courseTitle}
              isLoading={state.isCourseNavigationLoading}
            />
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
                lesson={state.activeLesson}
                currentStepId={state.stepId}
                courseId={state.courseId}
                isLoading={state.isCourseNavigationLoading}
              />
            )}

            <Box
              // key={state.pathname}
              component="main"
              ref={mainContentRef}
              sx={{
                flex: 1,
                overflowY: 'auto',
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
              }}
            >
              <PageContainer variant="narrow">
                {state.isCourseNavigationLoading ? (
                  <StepContentSkeleton />
                ) : (
                  <Outlet context={context} />
                )}
              </PageContainer>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
