import { Box, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'

import { LearnHeaderLeft } from '@/app/layouts/learn-layout/ui/LearnHeaderLeft'
import { LearnMainSkeleton } from '@/app/layouts/learn-layout/ui/LearnMainSkeleton'
import { trpc } from '@/shared/api'
import { useIsMobile } from '@/shared/lib'
import { PageContainer, Result404 } from '@/shared/ui'
import { CourseSidebar } from '@/widgets/course-sidebar'
import type { LearnOutletContext } from '@/widgets/course-sidebar/model'
import { Header, HeaderActions } from '@/widgets/header'
import { useHeaderActions } from '@/widgets/header/model/useHeaderActions'

export const LearnLayout = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const mainContentRef = useRef<HTMLElement>(null)

  const { courseId = '' } = useParams()

  const { data: courseNavigationData, isLoading: isCourseNavigationLoading } =
    trpc.learning.getCourseNavigation.useQuery({ courseId }, { enabled: !!courseId })

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!isMobile)

  const headerActions = useHeaderActions({
    withMobileMenu: false,
  })

  const courseTitle = courseNavigationData?.courseTitle ?? ''

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0
    }
  }, [pathname])

  const outletContext: LearnOutletContext = {
    navigation: courseNavigationData?.navigation ?? [],
    lastViewedStepId: courseNavigationData?.lastViewedStepId ?? '',
    courseTitle,
  }

  const isCourseNotFound = !courseNavigationData && !isCourseNavigationLoading

  return (
    <>
      <Header
        leftSlot={<LearnHeaderLeft sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        rightSlot={<HeaderActions actions={headerActions} edgeToEnd={true} />}
        containerVariant="fluid"
      />

      {isCourseNotFound ? (
        <Result404 />
      ) : (
        <Box
          sx={{
            display: 'flex',
            height: {
              xs: 'auto',
              md: `calc(100vh - ${theme.layout.headerHeight.desktop}px)`,
            },
            minHeight: { xs: '100vh', md: 'auto' },
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <CourseSidebar
            navigation={courseNavigationData?.navigation ?? []}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            courseTitle={courseTitle}
            isLoading={isCourseNavigationLoading}
          />

          <Box
            key={pathname}
            component="main"
            ref={mainContentRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <PageContainer variant="narrow">
              {isCourseNavigationLoading ? (
                <LearnMainSkeleton />
              ) : (
                <Outlet context={outletContext} />
              )}
            </PageContainer>
          </Box>
        </Box>
      )}
    </>
  )
}
