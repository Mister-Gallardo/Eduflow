import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import type { LearnOutletContext } from '@/entities/course'
import { trpc } from '@/shared/api'
import { useIsMobile } from '@/shared/lib'

import { findActiveLessonId } from './find-active-lesson-id'

export const useLearnLayout = () => {
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const { courseId = '', stepId } = useParams()
  const mainContentRef = useRef<HTMLElement>(null)

  const { data, isLoading } = trpc.learning.getCourseNavigation.useQuery(
    { courseId },
    { enabled: !!courseId },
  )

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!isMobile)

  const modules = data?.navigation ?? []
  const activeLesson = findActiveLessonId(modules, stepId)
  const courseTitle = data?.courseTitle ?? ''

  const outletContext: LearnOutletContext = {
    navigation: modules,
    lastViewedStepId: data?.lastViewedStepId ?? '',
    courseTitle,
  }

  const isCourseNotFound = !data && !isLoading

  useEffect(() => {
    mainContentRef.current?.scrollTo(0, 0)
  }, [pathname])

  return {
    state: {
      sidebarOpen,
      isCourseNavigationLoading: isLoading,
      isCourseNotFound,
      activeLesson,
      courseTitle,
      stepId,
      courseId,
      pathname,
    },
    mainContentRef,
    actions: {
      setSidebarOpen,
    },
    context: outletContext,
    navigation: modules,
  }
}
