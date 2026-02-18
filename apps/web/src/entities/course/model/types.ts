import type { ApiOutputs } from '@/shared/api/trpc'

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export type Course = ApiOutputs['courses']['getCourses'][number]
