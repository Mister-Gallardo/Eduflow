import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import type { ApiOutputs } from '@/shared/api/trpc'
import { trpc } from '@/shared/api/trpc'

import type { LearnOutletContext } from './types'
import { getCourseNavigationState } from './utils'

type SessionData = ApiOutputs['learning']['initCourseSession']

export const useCourseNavigation = () => {
  const { courseId = '', stepId = '' } = useParams()
  const location = useLocation()

  const shouldEnroll = (location.state as { enroll?: boolean } | null)?.enroll === true

  const [sessionData, setSessionData] = useState<SessionData | null>(null)

  const initSession = trpc.learning.initCourseSession.useMutation({
    onSuccess: (data) => {
      setSessionData(data)
    },
  })

  // Trigger initCourseSession on mount
  useEffect(() => {
    if (!courseId) return

    initSession.mutate({ courseId, enroll: shouldEnroll || undefined })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  const modules = sessionData?.navigation ?? []
  const isCourseNavigationLoading = initSession.isPending && !sessionData

  const { activeModuleId, activeLesson, prevStepId, nextStepId } = getCourseNavigationState(
    modules,
    stepId,
  )

  const courseTitle = sessionData?.courseTitle ?? ''

  const isCourseNavigationFetched = !!sessionData || initSession.isError
  const isCourseNotFound = !sessionData && isCourseNavigationFetched
  const isLessonNotFound = !activeLesson && isCourseNavigationFetched
  const shouldShow404 = initSession.isError || isCourseNotFound || isLessonNotFound

  const outletContext: LearnOutletContext = {
    navigation: modules,
    lastViewedStepId: sessionData?.lastViewedStepId ?? '',
    courseTitle,
    courseId,
    stepId,
    prevStepId,
    nextStepId,
    isCourseNavigationLoading,
    firstStepData: sessionData?.firstStepData,
  }

  return {
    state: {
      activeModuleId,
      shouldShow404,
      activeLesson,
      courseId,
      courseTitle,
      stepId,
      isCourseNavigationLoading,
    },
    context: outletContext,
    navigation: modules,
  }
}
