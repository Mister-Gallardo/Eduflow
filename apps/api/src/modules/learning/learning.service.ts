import { StepStatus } from '@eduflow/db'
import {
  CHECKABLE_STEP_TYPES,
  type CheckStepInput,
  type CheckStepResult,
  COMPLETABLE_STEP_TYPES,
  type CompleteStepInput,
  type CompleteStepResult,
  type GetCourseNavigationInput,
  type GetStepDataInput,
  omit,
  REVIEWABLE_STEP_TYPES,
  type StepType,
} from '@eduflow/shared'
import { TRPCError } from '@trpc/server'

import type { AuthorizedContext } from '../../trpc/context.js'
import { checkEnrollmentService } from '../enrollment/enrollment.service.js'

import { stripAnswers, validateAnswer } from './lib/utils.js'
import { getStepOrThrow } from './learning.repository.js'

export const getCourseNavigationService = async (
  ctx: AuthorizedContext,
  input: GetCourseNavigationInput,
) => {
  const { courseId } = input

  const enrollment = await ctx.db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: ctx.me.id,
        courseId,
      },
    },
    include: {
      course: {
        select: { title: true },
      },
    },
  })

  if (!enrollment) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Not enrolled in this course' })
  }

  const modules = await ctx.db.module.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          steps: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              type: true,
              order: true,
            },
          },
        },
      },
    },
  })

  const progress = await ctx.db.userProgress.findMany({
    where: {
      userId: ctx.me.id,
      step: {
        lesson: {
          module: { courseId },
        },
      },
    },
    select: {
      stepId: true,
      status: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  const progressMap = new Map(progress.map((p) => [p.stepId, p.status]))

  let lastViewedStepId = progress[0]?.stepId

  if (!lastViewedStepId && modules.length > 0) {
    const firstModule = modules[0]
    if (firstModule && firstModule.lessons.length > 0) {
      const firstLesson = firstModule.lessons[0]
      if (firstLesson && firstLesson.steps.length > 0) {
        lastViewedStepId = firstLesson.steps[0].id
      }
    }
  }

  const navigation = modules.map((module) => ({
    id: module.id,
    title: module.title,
    lessons: module.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      steps: lesson.steps.map((step) => ({
        id: step.id,
        title: step.title,
        type: step.type,
        status: progressMap.get(step.id) ?? 'NOT_STARTED',
      })),
    })),
  }))

  return { navigation, lastViewedStepId, courseTitle: enrollment.course.title }
}

export const getStepDataService = async (ctx: AuthorizedContext, input: GetStepDataInput) => {
  const { courseId, stepId } = input

  const [step] = await Promise.all([
    getStepOrThrow(ctx, courseId, stepId),
    checkEnrollmentService(ctx, { courseId }),
  ])

  // Получаем прогресс юзера по этому шагу
  let userProgress = await ctx.db.userProgress.findUnique({
    where: { userId_stepId: { userId: ctx.me.id, stepId } },
    select: { status: true, answer: true },
  })

  const isCompletableStep = COMPLETABLE_STEP_TYPES.includes(step.type)

  if (isCompletableStep && userProgress?.status !== StepStatus.APPROVED) {
    userProgress = await ctx.db.userProgress.upsert({
      where: { userId_stepId: { userId: ctx.me.id, stepId } },
      update: { status: StepStatus.APPROVED, updatedAt: new Date() },
      create: { userId: ctx.me.id, stepId, status: StepStatus.APPROVED },
      select: { status: true, answer: true },
    })
  }

  // Фильтруем ответы из контента
  const safeContent = stripAnswers(step.content as Record<string, unknown>, step.type as StepType)

  return {
    step: {
      ...omit(step, ['lessonId']),
      content: safeContent,
    },
    userProgress,
  }
}

export const checkStepService = async (
  ctx: AuthorizedContext,
  input: CheckStepInput,
): Promise<CheckStepResult> => {
  const { courseId, stepId, answer } = input

  const [step] = await Promise.all([
    getStepOrThrow(ctx, courseId, stepId),
    checkEnrollmentService(ctx, { courseId }),
  ])

  const stepType = step.type

  // Валидация: только checkable типы
  if (!CHECKABLE_STEP_TYPES.includes(stepType)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Step type "${stepType}" does not support answer checking. Use completeStep instead.`,
    })
  }

  const content = step.content as Record<string, unknown>
  const { isCorrect } = validateAnswer(content, stepType, answer)
  const status = isCorrect ? StepStatus.APPROVED : StepStatus.FAILED

  const currentProgress = await ctx.db.userProgress.findUnique({
    where: { userId_stepId: { userId: ctx.me.id, stepId } },
  })

  const shouldUpdate = currentProgress?.status !== StepStatus.APPROVED || isCorrect

  if (!shouldUpdate) return { isCorrect }

  await ctx.db.userProgress.upsert({
    where: { userId_stepId: { userId: ctx.me.id, stepId } },
    update: {
      status: status,
      answer: answer,
      updatedAt: new Date(),
    },
    create: {
      userId: ctx.me.id,
      stepId,
      status,
      answer: answer,
    },
  })

  return { isCorrect }
}

export const submitStepService = async (
  ctx: AuthorizedContext,
  input: CompleteStepInput,
): Promise<CompleteStepResult> => {
  const { courseId, stepId, answer } = input

  const [step] = await Promise.all([
    getStepOrThrow(ctx, courseId, stepId),
    checkEnrollmentService(ctx, { courseId }),
  ])

  const stepType = step.type as StepType

  if (!REVIEWABLE_STEP_TYPES.includes(stepType)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Step type "${stepType}" requires answer checking. Use checkStep instead.`,
    })
  }

  await ctx.db.userProgress.upsert({
    where: {
      userId_stepId: {
        userId: ctx.me.id,
        stepId,
      },
    },
    update: {
      status: StepStatus.PENDING,
      answer: answer != null ? (answer as object) : undefined,
      updatedAt: new Date(),
    },
    create: {
      userId: ctx.me.id,
      stepId,
      status: StepStatus.PENDING,
      answer: answer != null ? (answer as object) : undefined,
    },
  })

  return { success: true }
}
