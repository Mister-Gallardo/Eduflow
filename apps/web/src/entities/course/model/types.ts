import type { ApiOutputs } from '@/shared/api/trpc'

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export type Course = ApiOutputs['courses']['getCourses'][number]

export type EnrolledCourse = ApiOutputs['enrollment']['getEnrolledCourses'][number]
