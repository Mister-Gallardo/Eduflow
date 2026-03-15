import { useParams } from 'react-router-dom'

import { useGetMe } from '@/entities/user'
import { trpc } from '@/shared/api/trpc'

import type { LearnOutletContext } from './types'
import { getCourseNavigationState } from './utils'

export const useCourseNavigation = () => {
  const { courseId = '', stepId = '' } = useParams()

  const { user } = useGetMe()

  const {
    data: courseNavigation,
    isLoading: isCourseNavigationLoading,
    isFetched: isCourseNavigationFetched,
  } = trpc.learning.getCourseNavigation.useQuery({ courseId }, { enabled: !!courseId })

  const modules = courseNavigation?.navigation ?? []

  const { activeModuleId, activeLesson, prevStepId, nextStepId } = getCourseNavigationState(
    modules,
    stepId,
  )

  const courseTitle = courseNavigation?.courseTitle ?? ''

  const isCourseNavigationReady = !isCourseNavigationLoading && isCourseNavigationFetched
  const isModuleNotFound = !activeModuleId && isCourseNavigationReady
  const isLessonNotFound = !activeLesson && isCourseNavigationReady
  const shouldShow404 = isModuleNotFound || isLessonNotFound

  const outletContext: LearnOutletContext = {
    navigation: modules,
    courseId,
    courseTitle,
    stepId,
    lastViewedStepId: courseNavigation?.lastViewedStepId ?? '',
    prevStepId,
    nextStepId,
    isCourseNavigationLoading,
  }

  return {
    state: {
      courseId,
      courseTitle,
      activeModuleId,
      activeLesson,
      stepId,
      shouldShow404,
      isCourseNavigationLoading,
    },
    isUserAuthor: user?.id === courseNavigation?.authorId,
    context: outletContext,
    navigation: modules,
  }
}
