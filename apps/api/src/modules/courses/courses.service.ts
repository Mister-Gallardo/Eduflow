import type { Prisma } from '@eduflow/db'
import type { GetCoursesInput, UpdateCourseInput } from '@eduflow/shared'
import { TRPCError } from '@trpc/server'

import type { AuthorizedContext, Context } from '../../trpc/context.js'

export async function getCoursesService(ctx: Context, input: GetCoursesInput = {}) {
  const { search, categories, levels, minPrice, maxPrice, limit, sortBy } = input

  const trimSearch = search?.trim()

  const normalizedSearch = trimSearch && trimSearch.length > 0 ? trimSearch : undefined

  const where: Prisma.CourseWhereInput = {
    ...(normalizedSearch && {
      OR: [
        { title: { contains: normalizedSearch, mode: 'insensitive' } },
        { description: { contains: normalizedSearch, mode: 'insensitive' } },
      ],
    }),

    ...(categories &&
      categories.length > 0 && {
        category: { in: categories },
      }),

    ...(levels &&
      levels.length > 0 && {
        level: { in: levels },
      }),

    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          price: {
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
          },
        }
      : {}),
  }

  const orderBy: Prisma.CourseOrderByWithRelationInput = (() => {
    switch (sortBy) {
      case 'price_asc':
        return { price: 'asc' }
      case 'price_desc':
        return { price: 'desc' }
      case 'newest':
      default:
        return { createdAt: 'desc' }
    }
  })()

  const courses = await ctx.db.course.findMany({
    where,
    orderBy,
    take: limit,
  })

  return courses
}

// ─── Update Course ───

export async function updateCourseService(ctx: AuthorizedContext, input: UpdateCourseInput) {
  const course = await ctx.db.course.findUnique({
    where: { id: input.id },
    select: { authorId: true },
  })

  if (!course) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Курс не найден' })
  }

  if (course.authorId !== ctx.me.id) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Нет прав для редактирования этого курса' })
  }

  const { id, ...rest } = input

  return ctx.db.course.update({
    where: { id },
    data: rest,
  })
}
