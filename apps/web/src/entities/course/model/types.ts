export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: CourseLevel
  category: string
  createdAt: Date | string
}
