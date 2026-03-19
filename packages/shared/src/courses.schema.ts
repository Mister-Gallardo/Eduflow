import z from 'zod'

// ─── Constants ───

export const COURSE_CATEGORIES = ['DEVELOPMENT', 'DESIGN', 'ANALYTICS', 'MARKETING'] as const
export const COURSE_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const

// ─── Get Courses ───

export const zGetCoursesInput = z
  .object({
    search: z.string().optional(),
    categories: z.array(z.enum(COURSE_CATEGORIES)).optional(),
    levels: z.array(z.enum(COURSE_LEVELS)).optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().optional(),
    limit: z.number().min(1).max(50).optional(),
    sortBy: z.enum(['price_asc', 'price_desc', 'newest']).optional(),
  })
  .optional()

export const zCourse = z.object({
  id: z.cuid(),
  title: z.string(),
  price: z.number(),
  duration: z.number(),
  category: z.string(),
  level: z.enum(COURSE_LEVELS),
  createdAt: z.date(),
})

export type GetCoursesInput = z.infer<typeof zGetCoursesInput>
export type Course = z.infer<typeof zCourse>

// ─── Update Course ───

export const zUpdateCourseInput = z.object({
  id: z.string(),
  title: z.string().min(1, 'Название обязательно').max(200),
  description: z.string().min(1, 'Описание обязательно').max(2000),
  price: z.number().min(0, 'Цена не может быть отрицательной'),
  duration: z.number().min(0).optional(),
  level: z.enum(COURSE_LEVELS),
  category: z.enum(COURSE_CATEGORIES),
})

export type UpdateCourseInput = z.infer<typeof zUpdateCourseInput>
