import type { ApiOutputs } from '@/shared/api/trpc'

type CourseNavigationData = ApiOutputs['learning']['getCourseNavigation']

export type NavigationModule = CourseNavigationData['navigation'][number]

export type NavigationLesson = NavigationModule['lessons'][number]

export type NavigationStep = NavigationLesson['steps'][number]

export interface LearnOutletContext {
  navigation: CourseNavigationData['navigation']
  courseId: string
  courseTitle: CourseNavigationData['courseTitle']
  stepId: string
  lastViewedStepId: CourseNavigationData['lastViewedStepId']
  prevStepId: string | null
  nextStepId: string | null
  isCourseNavigationLoading: boolean
}
