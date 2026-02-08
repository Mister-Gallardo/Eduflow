import z from 'zod'

export const zGetCoursesInput = z
  .object({
    search: z.string().optional(),
    categories: z.array(z.string()).optional(),
    levels: z.array(z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])).optional(),
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
  duration: z.string(),
  category: z.string(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  createdAt: z.date(),
})

export type GetCoursesInput = z.infer<typeof zGetCoursesInput>
export type Course = z.infer<typeof zCourse>
