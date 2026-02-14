import type { ApiOutputs } from '@/shared/api'

export type CourseNavigationData = ApiOutputs['learning']['getCourseNavigation']

export type NavigationModule = CourseNavigationData['navigation'][number]

export type NavigationLesson = NavigationModule['lessons'][number]

export type NavigationStep = NavigationLesson['steps'][number]

export interface LearnOutletContext {
  navigation: CourseNavigationData['navigation']
  lastViewedStepId: CourseNavigationData['lastViewedStepId']
  courseTitle: CourseNavigationData['courseTitle']
}
