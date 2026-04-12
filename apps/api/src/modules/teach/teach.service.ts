import type { Prisma } from '@eduflow/db'
import { StepStatus } from '@eduflow/db'
import {
  type GetRepliesServiceInput,
  type PendingSubmission,
  type PendingSubmissionsResult,
  REVIEWABLE_STEP_TYPES,
  type ReviewReplyInput,
  type TeachCourse,
  type TeachStats,
} from '@eduflow/shared'

import type { AuthorizedContext } from '../../trpc/context.js'

import { assertTeacher } from './lib/utils.js'

// ─── Course By Id ───

export async function getTeachCourseByIdService(ctx: AuthorizedContext, courseId: string) {
  await assertTeacher(ctx)
  return ctx.db.course.findFirstOrThrow({
    where: { id: courseId, authorId: ctx.me.id },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      duration: true,
      level: true,
      category: true,
    },
  })
}

// ─── Stats ───

export async function getTeachStatsService(ctx: AuthorizedContext): Promise<TeachStats> {
  await assertTeacher(ctx)
  const authorId = ctx.me.id

  const [totalCourses, totalStudents, totalCompletedSteps, pendingReviewCount] = await Promise.all([
    ctx.db.course.count({ where: { authorId } }),

    ctx.db.enrollment.count({
      where: { course: { authorId } },
    }),

    ctx.db.userProgress.count({
      where: {
        status: StepStatus.APPROVED,
        step: { lesson: { module: { course: { authorId } } } },
      },
    }),

    ctx.db.userProgress.count({
      where: {
        status: StepStatus.PENDING,
        step: { lesson: { module: { course: { authorId } } } },
      },
    }),
  ])

  return { totalCourses, totalStudents, totalCompletedSteps, pendingReviewCount }
}

// ─── Courses ───

export async function getTeachCoursesService(ctx: AuthorizedContext): Promise<TeachCourse[]> {
  await assertTeacher(ctx)
  const authorId = ctx.me.id

  const courses = await ctx.db.course.findMany({
    where: { authorId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      category: true,
      updatedAt: true,
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  })

  if (courses.length === 0) return []

  const courseIds = courses.map((c) => c.id)

  // Batch: подсчёт PENDING ответов по всем курсам за один запрос
  const pendingRows = await ctx.db.userProgress.groupBy({
    by: ['stepId'],
    where: {
      status: StepStatus.PENDING,
      step: { lesson: { module: { courseId: { in: courseIds } } } },
    },
    _count: true,
  })

  if (pendingRows.length === 0) {
    return courses.map((c) => ({
      id: c.id,
      title: c.title,
      category: c.category,
      updatedAt: c.updatedAt,
      studentsCount: c._count.enrollments,
      pendingReviewCount: 0,
    }))
  }

  // Нужно маппить stepId → courseId
  const stepIds = pendingRows.map((r) => r.stepId)
  const steps = await ctx.db.step.findMany({
    where: { id: { in: stepIds } },
    select: {
      id: true,
      lesson: { select: { module: { select: { courseId: true } } } },
    },
  })

  const stepToCourseMap = new Map<string, string>()
  for (const s of steps) {
    stepToCourseMap.set(s.id, s.lesson.module.courseId)
  }

  const pendingMap = new Map<string, number>()
  for (const row of pendingRows) {
    const courseId = stepToCourseMap.get(row.stepId)
    if (!courseId) continue
    pendingMap.set(courseId, (pendingMap.get(courseId) ?? 0) + row._count)
  }

  return courses.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    updatedAt: c.updatedAt,
    studentsCount: c._count.enrollments,
    pendingReviewCount: pendingMap.get(c.id) ?? 0,
  }))
}

// ─── Replies Helpers ───

function buildBaseWhere(
  authorId: string,
  status?: Prisma.UserProgressWhereInput['status'],
): Prisma.UserProgressWhereInput {
  return {
    status,
    step: {
      type: {
        in: REVIEWABLE_STEP_TYPES,
      },
      lesson: {
        module: {
          course: { authorId },
        },
      },
    },
  }
}

function buildSearchFilter(search?: string): Prisma.UserProgressWhereInput {
  if (!search) return {}
  return {
    OR: [
      { user: { fullName: { contains: search, mode: 'insensitive' } } },
      { step: { title: { contains: search, mode: 'insensitive' } } },
      {
        step: {
          lesson: {
            module: {
              course: { title: { contains: search, mode: 'insensitive' } },
            },
          },
        },
      },
    ],
  }
}

const replySelect = {
  id: true,
  status: true,
  answer: true,
  reviewComment: true,
  reviewedAt: true,
  updatedAt: true,
  user: {
    select: { id: true, fullName: true },
  },
  step: {
    select: {
      id: true,
      title: true,
      type: true,
      lesson: {
        select: {
          title: true,
          module: {
            select: {
              course: {
                select: { id: true, title: true },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.UserProgressSelect

type ReplyQueryResult = Prisma.UserProgressGetPayload<{ select: typeof replySelect }>

function mapReply(item: ReplyQueryResult): PendingSubmission {
  return {
    id: item.id,
    status: item.status,
    answer: item.answer,
    updatedAt: item.updatedAt,
    reviewComment: item.reviewComment,
    reviewedAt: item.reviewedAt,
    student: item.user,
    step: {
      id: item.step.id,
      title: item.step.title,
      type: item.step.type,
    },
    course: {
      id: item.step.lesson.module.course.id,
      title: item.step.lesson.module.course.title,
    },
    lesson: {
      title: item.step.lesson.title,
    },
  }
}

// ─── Replies ───

export async function getPendingRepliesService(
  ctx: AuthorizedContext,
  input: GetRepliesServiceInput,
): Promise<PendingSubmissionsResult> {
  await assertTeacher(ctx)
  const authorId = ctx.me.id
  const search = input?.search
  const cursor = input?.cursor
  const limit = input?.limit ?? 20

  const items = await ctx.db.userProgress.findMany({
    where: {
      AND: [buildBaseWhere(authorId, StepStatus.PENDING), buildSearchFilter(search)],
    },
    orderBy: { updatedAt: 'desc' },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: replySelect,
  })

  const hasMore = items.length > limit
  const data = hasMore ? items.slice(0, limit) : items

  return {
    items: data.map(mapReply),
    nextCursor: hasMore ? (data[data.length - 1]?.id ?? null) : null,
  }
}

export async function getReviewedRepliesService(
  ctx: AuthorizedContext,
  input: GetRepliesServiceInput,
): Promise<PendingSubmissionsResult> {
  await assertTeacher(ctx)
  const authorId = ctx.me.id
  const search = input?.search
  const cursor = input?.cursor
  const limit = input?.limit ?? 20

  const items = await ctx.db.userProgress.findMany({
    where: {
      AND: [
        buildBaseWhere(authorId, { in: [StepStatus.APPROVED, StepStatus.FAILED] }),
        buildSearchFilter(search),
      ],
    },
    orderBy: { updatedAt: 'desc' },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: replySelect,
  })

  const hasMore = items.length > limit
  const data = hasMore ? items.slice(0, limit) : items

  return {
    items: data.map(mapReply),
    nextCursor: hasMore ? (data[data.length - 1]?.id ?? null) : null,
  }
}

// ─── Review Reply ───

export async function reviewReplyService(
  ctx: AuthorizedContext,
  input: ReviewReplyInput,
): Promise<void> {
  await assertTeacher(ctx)
  const authorId = ctx.me.id

  // Проверяем, что ответ существует и принадлежит курсу текущего автора
  const progress = await ctx.db.userProgress.findUniqueOrThrow({
    where: { id: input.id },
    select: {
      step: {
        select: {
          lesson: {
            select: {
              module: {
                select: { course: { select: { authorId: true } } },
              },
            },
          },
        },
      },
    },
  })

  if (progress.step.lesson.module.course.authorId !== authorId) {
    throw new Error('Нет прав для проверки этого ответа')
  }

  await ctx.db.userProgress.update({
    where: { id: input.id },
    data: {
      status: input.status,
      reviewComment: input.comment ?? null,
      reviewedAt: new Date(),
    },
  })
}
