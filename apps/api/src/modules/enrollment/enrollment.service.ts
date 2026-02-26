import { StepStatus } from '@eduflow/db'
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
    where: { userId: ctx.me.id },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: {
                include: { steps: { select: { id: true } } },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const courseIds = enrollments.map((e) => e.courseId)

  if (courseIds.length === 0) return []

  // Batch: подсчёт APPROVED шагов по всем курсам за один запрос
  const progressRows = await ctx.db.userProgress.findMany({
    where: {
      userId: ctx.me.id,
      status: StepStatus.APPROVED,
      step: { lesson: { module: { courseId: { in: courseIds } } } },
    },
    select: {
      stepId: true,
      updatedAt: true,
      step: { select: { lesson: { select: { module: { select: { courseId: true } } } } } },
    },
  })

  // Группировка: courseId → { completedSteps, lastActivityAt }
  const progressMap = new Map<string, { completedSteps: number; lastActivityAt: Date | null }>()

  for (const row of progressRows) {
    const cId = row.step.lesson.module.courseId
    const entry = progressMap.get(cId) ?? { completedSteps: 0, lastActivityAt: null }
    entry.completedSteps++
    if (!entry.lastActivityAt || row.updatedAt > entry.lastActivityAt) {
      entry.lastActivityAt = row.updatedAt
    }
    progressMap.set(cId, entry)
  }

  return enrollments.map((e) => {
    const totalSteps = e.course.modules.reduce(
      (sum, m) => sum + m.lessons.reduce((s, l) => s + l.steps.length, 0),
      0,
    )
    const progress = progressMap.get(e.courseId)

    return {
      id: e.course.id,
      title: e.course.title,
      description: e.course.description,
      price: e.course.price,
      duration: e.course.duration,
      level: e.course.level,
      category: e.course.category,
      createdAt: e.course.createdAt,
      totalSteps,
      completedSteps: progress?.completedSteps ?? 0,
      lastActivityAt: progress?.lastActivityAt ?? null,
    }
  })
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
