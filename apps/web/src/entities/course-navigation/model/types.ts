import type { ApiOutputs } from '@/shared/api/trpc'

type CourseNavigationData = ApiOutputs['learning']['getCourseNavigation']
type InitCourseSessionData = ApiOutputs['learning']['initCourseSession']

export type NavigationModule = CourseNavigationData['navigation'][number]

export type NavigationLesson = NavigationModule['lessons'][number]

export type NavigationStep = NavigationLesson['steps'][number]

export interface LearnOutletContext {
  navigation: CourseNavigationData['navigation']
  lastViewedStepId: CourseNavigationData['lastViewedStepId']
  courseTitle: CourseNavigationData['courseTitle']
  courseId: string
  stepId: string
  prevStepId: string | null
  nextStepId: string | null
  isCourseNavigationLoading: boolean
  firstStepData: InitCourseSessionData['firstStepData'] | undefined
}
