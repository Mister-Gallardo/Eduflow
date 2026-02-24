import type { EnrollCourseInput, GetCoursesInput } from '@eduflow/shared'
import { TRPCError } from '@trpc/server'

import type { AuthorizedContext } from '../../trpc/context.js'

import type { CheckEnrollmentInput } from './enrollment.types.js'

export const enrollService = async (ctx: AuthorizedContext, input: EnrollCourseInput) => {
  const { courseId } = input

  const course = await ctx.db.course.findUnique({
    where: { id: courseId },
  })

  if (!course) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Course not found' })
  }

  const existingEnrollment = await ctx.db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: ctx.me.id,
        courseId,
      },
    },
  })

  if (existingEnrollment) {
    return { success: true, message: 'Already enrolled' }
  }

  await ctx.db.enrollment.create({
    data: {
      userId: ctx.me.id,
      courseId,
    },
  })

  return { success: true }
}

// При необходимости _input убрать префикс и использовать
export async function getEnrolledCoursesService(ctx: AuthorizedContext, _input: GetCoursesInput) {
  const enrollments = await ctx.db.enrollment.findMany({
    where: {
      userId: ctx.me.id,
    },
    include: {
      course: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return enrollments.map((e) => e.course)
}

export const checkEnrollmentService = async (
  ctx: AuthorizedContext,
  input: CheckEnrollmentInput,
) => {
  const { courseId } = input

  const enrollment = await ctx.db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: ctx.me.id,
        courseId,
      },
    },
  })

  if (!enrollment) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Not enrolled in this course' })
  }

  return enrollment
}
