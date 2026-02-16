import { Box, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { PageContainer, Result404 } from '@/shared/ui'
import { CourseSidebar } from '@/widgets/course-sidebar'
import { Header, HeaderActions, useHeaderActions } from '@/widgets/header'
import { LessonStepsPanel } from '@/widgets/lesson-steps-panel'

import { useLearnLayout } from '../model'

import { LearnHeaderLeft } from './learn-header-left'
import { LearnMainSkeleton } from './learn-main-skeleton'

export const LearnLayout = () => {
  const theme = useTheme()
  const { state, actions, mainContentRef, context, navigation } = useLearnLayout()
  const headerActions = useHeaderActions({ withMobileMenu: false })

  return (
    <>
      <Header
        leftSlot={
          <LearnHeaderLeft
            sidebarOpen={state.sidebarOpen}
            setSidebarOpen={actions.setSidebarOpen}
          />
        }
        rightSlot={<HeaderActions actions={headerActions} edgeToEnd={true} />}
        containerVariant="fluid"
      />

      {state.isCourseNotFound ? (
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
          <CourseSidebar
            navigation={navigation}
            open={state.sidebarOpen}
            onClose={() => actions.setSidebarOpen(false)}
            courseTitle={state.courseTitle}
            isLoading={state.isCourseNavigationLoading}
          />

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {state.activeLesson?.steps.length && (
              <LessonStepsPanel
                lesson={state.activeLesson}
                currentStepId={state.stepId}
                courseId={state.courseId}
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
                  <LearnMainSkeleton />
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
