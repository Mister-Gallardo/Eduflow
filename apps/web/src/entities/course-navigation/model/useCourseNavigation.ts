import { useParams } from 'react-router-dom'

import { trpc } from '@/shared/api'

import type { LearnOutletContext } from './types'
import { findActiveLesson, findActiveModuleId } from './utils'

export const useCourseNavigation = () => {
  const { courseId = '', stepId } = useParams()

  const {
    data: courseNavigationData,
    isLoading: isCourseNavigationLoading,
    isFetched: isCourseNavigationFetched,
  } = trpc.learning.getCourseNavigation.useQuery({ courseId }, { enabled: !!courseId })

  const modules = courseNavigationData?.navigation ?? []
  const activeModuleId = findActiveModuleId(modules, stepId)
  const activeLesson = findActiveLesson(modules, stepId)
  const courseTitle = courseNavigationData?.courseTitle ?? ''

  const isCourseNotFound = !courseNavigationData && isCourseNavigationFetched
  const isLessonNotFound = !activeLesson && isCourseNavigationFetched
  const shouldShow404 = isCourseNotFound || isLessonNotFound

  const outletContext: LearnOutletContext = {
    navigation: modules,
    lastViewedStepId: courseNavigationData?.lastViewedStepId ?? '',
    courseTitle,
  }

  return {
    state: {
      isCourseNavigationLoading,
      shouldShow404,
      activeModuleId,
      activeLesson,
      courseTitle,
      stepId,
      courseId,
    },
    context: outletContext,
    navigation: modules,
  }
}
