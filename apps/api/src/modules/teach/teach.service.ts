import type { Prisma } from '@eduflow/db'
import { StepStatus } from '@eduflow/db'
import type {
  GetPendingSubmissionsInput,
  PendingSubmission,
  PendingSubmissionsResult,
  TeachCourse,
  TeachStats,
} from '@eduflow/shared'

import type { AuthorizedContext } from '../../trpc/context.js'

// ─── Stats ───

export async function getTeachStatsService(ctx: AuthorizedContext): Promise<TeachStats> {
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

// ─── Pending Submissions ───

export async function getPendingSubmissionsService(
  ctx: AuthorizedContext,
  input: GetPendingSubmissionsInput,
): Promise<PendingSubmissionsResult> {
  const authorId = ctx.me.id
  const status = input?.status ?? StepStatus.PENDING
  const search = input?.search
  const cursor = input?.cursor
  const limit = input?.limit ?? 20

  /**
   * Базовый фильтр: только шаги из курсов данного автора с нужным статусом.
   * `satisfies` гарантирует соответствие типу Prisma.UserProgressWhereInput,
   * помогая избежать опечаток в глубоких связях.
   */
  const baseWhere = {
    status,
    step: {
      lesson: {
        module: {
          course: { authorId },
        },
      },
    },
  } satisfies Prisma.UserProgressWhereInput

  const searchFilter: Prisma.UserProgressWhereInput = search
    ? {
        OR: [
          { user: { fullName: { contains: search, mode: 'insensitive' } } },
          {
            step: {
              title: { contains: search, mode: 'insensitive' },
            },
          },
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
    : {}

  const items = await ctx.db.userProgress.findMany({
    where: { AND: [baseWhere, searchFilter] },
    orderBy: { updatedAt: 'desc' },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: {
      id: true,
      status: true,
      answer: true,
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
    },
  })

  const hasMore = items.length > limit
  const data = hasMore ? items.slice(0, limit) : items

  const mapped: PendingSubmission[] = data.map((item) => ({
    id: item.id,
    status: item.status,
    answer: item.answer,
    updatedAt: item.updatedAt,
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
  }))

  return {
    items: mapped,
    nextCursor: hasMore ? (data[data.length - 1]?.id ?? null) : null,
  }
}
