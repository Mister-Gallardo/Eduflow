import {
  CHECKABLE_STEP_TYPES,
  type CheckStepInput,
  type CheckStepResult,
  COMPLETABLE_STEP_TYPES,
  type CompleteStepInput,
  type CompleteStepResult,
  type EnrollCourseInput,
  type GetCourseNavigationInput,
  type GetStepDataInput,
  omit,
  type StepAnswer,
  type StepType,
} from '@eduflow/shared'
import { TRPCError } from '@trpc/server'

import type { AuthorizedContext } from '../../trpc/context.js'

// ─── Helpers ───

/**
 * Проверяет, что юзер записан на курс. Выбрасывает FORBIDDEN если нет.
 */
const verifyEnrollment = async (ctx: AuthorizedContext, courseId: string) => {
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

/**
 * Получает шаг по ID с проверкой принадлежности к курсу.
 */
const getStepOrThrow = async (ctx: AuthorizedContext, courseId: string, stepId: string) => {
  const step = await ctx.db.step.findUnique({
    where: {
      id: stepId,
      lesson: {
        module: {
          courseId,
        },
      },
    },
  })

  if (!step) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Step not found' })
  }

  return step
}

// ─── Strip Answers (безопасная выдача контента) ───

/**
 * Удаляет правильные ответы из контента шага перед отправкой клиенту.
 * Для ORDERING — перемешивает элементы.
 * Для MATCHING — перемешивает правую колонку и удаляет pairs.
 */
const stripAnswers = (
  content: Record<string, unknown>,
  type: StepType,
): Record<string, unknown> => {
  // Deep clone — не мутируем оригинал
  const safe = structuredClone(content)

  switch (type) {
    case 'TEXT':
    case 'VIDEO':
    case 'FREE_TEXT':
      // Нечего скрывать
      return safe

    case 'TEST_SINGLE': {
      const options = safe.options as Record<string, unknown>[] | undefined
      if (options) {
        for (const opt of options) {
          delete opt.isCorrect
        }
      }
      delete safe.correctOptionId
      return safe
    }

    case 'TEST_MULTIPLE': {
      const options = safe.options as Record<string, unknown>[] | undefined
      if (options) {
        for (const opt of options) {
          delete opt.isCorrect
        }
      }
      delete safe.correctOptionIds
      return safe
    }

    case 'MATCHING': {
      // Перемешиваем правую сторону, удаляем пары
      const right = safe.right as Record<string, unknown>[] | undefined
      if (right) {
        safe.right = shuffleArray(right)
      }
      delete safe.pairs
      return safe
    }

    case 'ORDERING': {
      // Перемешиваем элементы, удаляем правильный порядок
      const items = safe.items as Record<string, unknown>[] | undefined
      if (items) {
        safe.items = shuffleArray(items)
      }
      delete safe.correctOrder
      return safe
    }

    case 'INPUT_TEXT': {
      delete safe.correctAnswers
      return safe
    }

    case 'INPUT_NUMBER': {
      delete safe.correctAnswer
      return safe
    }

    case 'FILL_GAPS': {
      const gaps = safe.gaps as Record<string, unknown>[] | undefined
      if (gaps) {
        for (const gap of gaps) {
          delete gap.correctAnswer
        }
      }
      return safe
    }

    default:
      return safe
  }
}

/**
 * Fisher-Yates shuffle — честное перемешивание массива.
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ─── Validate Answer ───

interface ValidationResult {
  isCorrect: boolean
  score: number
}

/**
 * Проверяет ответ юзера по оригинальному контенту из БД.
 */
const validateAnswer = (
  content: Record<string, unknown>,
  type: StepType,
  userAnswer: StepAnswer,
): ValidationResult => {
  switch (type) {
    case 'TEST_SINGLE': {
      const options = content.options as { id: string; isCorrect?: boolean }[] | undefined
      const correctOption = options?.find((o) => o.isCorrect)
      const correctId = correctOption?.id ?? (content.correctOptionId as string | undefined)
      const isCorrect = typeof userAnswer === 'string' && correctId === userAnswer
      return { isCorrect, score: isCorrect ? 100 : 0 }
    }

    case 'TEST_MULTIPLE': {
      const options = content.options as { id: string; isCorrect?: boolean }[] | undefined
      const correctIds = new Set(
        options?.filter((o) => o.isCorrect).map((o) => o.id) ??
          (content.correctOptionIds as string[] | undefined) ??
          [],
      )
      const userIds = new Set(Array.isArray(userAnswer) ? userAnswer.map(String) : [])

      if (correctIds.size !== userIds.size) {
        return { isCorrect: false, score: 0 }
      }

      const isCorrect = [...userIds].every((id) => correctIds.has(id))
      return { isCorrect, score: isCorrect ? 100 : 0 }
    }

    case 'MATCHING': {
      const correctPairs = (content.pairs as { leftId: string; rightId: string }[]) ?? []
      const userMap = typeof userAnswer === 'object' && !Array.isArray(userAnswer) ? userAnswer : {}

      const isCorrect =
        correctPairs.length === Object.keys(userMap).length &&
        correctPairs.every((p) => userMap[p.leftId] === p.rightId)

      return { isCorrect, score: isCorrect ? 100 : 0 }
    }

    case 'ORDERING': {
      const correctOrder =
        (content.correctOrder as string[]) ??
        ((content.items as { id: string }[]) ?? []).map((i) => i.id)

      const userOrder = Array.isArray(userAnswer) ? userAnswer : []
      const isCorrect = JSON.stringify(correctOrder) === JSON.stringify(userOrder)
      return { isCorrect, score: isCorrect ? 100 : 0 }
    }

    case 'INPUT_TEXT': {
      const validAnswers = (content.correctAnswers as string[]) ?? []
      if (typeof userAnswer !== 'string') {
        return { isCorrect: false, score: 0 }
      }

      const userText = userAnswer.trim().toLowerCase()

      const isCorrect = validAnswers.some((ans) => ans.trim().toLowerCase() === userText)
      return { isCorrect, score: isCorrect ? 100 : 0 }
    }

    case 'INPUT_NUMBER': {
      const correctAnswer = content.correctAnswer as number | undefined
      const isCorrect = correctAnswer !== undefined && Number(userAnswer) === correctAnswer
      return { isCorrect, score: isCorrect ? 100 : 0 }
    }

    case 'FILL_GAPS': {
      const gaps = (content.gaps as { id: string; correctAnswer: string }[]) ?? []
      const userMap = typeof userAnswer === 'object' && !Array.isArray(userAnswer) ? userAnswer : {}

      const isCorrect = gaps.every((gap) => {
        const userVal = String(userMap[gap.id] ?? '')
          .trim()
          .toLowerCase()
        const correctVal = String(gap.correctAnswer).trim().toLowerCase()
        return userVal === correctVal
      })

      return { isCorrect, score: isCorrect ? 100 : 0 }
    }

    default:
      return { isCorrect: false, score: 0 }
  }
}

// ─── Get Correct Answer (для ответа фронту после проверки) ───

/**
 * Извлекает правильный ответ из контента для отправки клиенту после проверки.
 */
const getCorrectAnswer = (content: Record<string, unknown>, type: StepType): StepAnswer | null => {
  switch (type) {
    case 'TEST_SINGLE': {
      const options = content.options as { id: string; isCorrect?: boolean }[] | undefined
      return options?.find((o) => o.isCorrect)?.id ?? (content.correctOptionId as string) ?? null
    }

    case 'TEST_MULTIPLE': {
      const options = content.options as { id: string; isCorrect?: boolean }[] | undefined
      return (
        options?.filter((o) => o.isCorrect).map((o) => o.id) ??
        (content.correctOptionIds as string[]) ??
        []
      )
    }

    case 'MATCHING': {
      const pairs = (content.pairs as { leftId: string; rightId: string }[]) ?? []
      return Object.fromEntries(pairs.map((p) => [p.leftId, p.rightId]))
    }

    case 'ORDERING':
      return (
        (content.correctOrder as string[]) ??
        ((content.items as { id: string }[]) ?? []).map((i) => i.id)
      )

    case 'INPUT_TEXT':
      return (content.correctAnswers as string[]) ?? []

    case 'INPUT_NUMBER':
      return (content.correctAnswer as number) ?? null

    case 'FILL_GAPS': {
      const gaps = (content.gaps as { id: string; correctAnswer: string }[]) ?? []
      return Object.fromEntries(gaps.map((g) => [g.id, g.correctAnswer]))
    }

    default:
      return null
  }
}

// ─── Services ───

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
      isCompleted: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  const progressMap = new Map(progress.map((p) => [p.stepId, p.isCompleted]))

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
        isCompleted: progressMap.get(step.id) ?? false,
      })),
    })),
  }))

  return { navigation, lastViewedStepId, courseTitle: enrollment.course.title }
}

export const getStepDataService = async (ctx: AuthorizedContext, input: GetStepDataInput) => {
  const { courseId, stepId } = input

  const [step] = await Promise.all([
    getStepOrThrow(ctx, courseId, stepId),
    verifyEnrollment(ctx, courseId),
  ])

  // Получаем прогресс юзера по этому шагу
  let userProgress = await ctx.db.userProgress.findUnique({
    where: {
      userId_stepId: {
        userId: ctx.me.id,
        stepId,
      },
    },
    select: {
      isCompleted: true,
      score: true,
      answer: true,
    },
  })

  const isInformationalStep = step.type === 'TEXT' || step.type === 'VIDEO'

  if (isInformationalStep && !userProgress?.isCompleted) {
    const updatedProgress = await ctx.db.userProgress.upsert({
      where: { userId_stepId: { userId: ctx.me.id, stepId } },
      update: {
        isCompleted: true,
        score: 100,
        updatedAt: new Date(),
      },
      create: {
        userId: ctx.me.id,
        stepId,
        isCompleted: true,
        score: 100,
      },
    })

    userProgress = {
      isCompleted: updatedProgress.isCompleted,
      score: updatedProgress.score,
      answer: updatedProgress.answer,
    }
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
    verifyEnrollment(ctx, courseId),
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
  const { isCorrect, score } = validateAnswer(content, stepType, answer)
  const correctAnswer = getCorrectAnswer(content, stepType)

  await ctx.db.$transaction(async (tx) => {
    const currentProgress = await tx.userProgress.findUnique({
      where: { userId_stepId: { userId: ctx.me.id, stepId } },
    })

    const shouldUpdateStatus = !currentProgress?.isCompleted || isCorrect

    await tx.userProgress.upsert({
      where: { userId_stepId: { userId: ctx.me.id, stepId } },
      update: {
        isCompleted: currentProgress?.isCompleted ? true : isCorrect,
        answer: shouldUpdateStatus ? (answer as object) : (currentProgress?.answer as object),
        score: shouldUpdateStatus ? score : currentProgress?.score,
        updatedAt: new Date(),
      },
      create: {
        userId: ctx.me.id,
        stepId,
        isCompleted: isCorrect,
        score,
        answer: answer as object,
      },
    })
  })

  return { isCorrect, score, correctAnswer }
}

export const completeStepService = async (
  ctx: AuthorizedContext,
  input: CompleteStepInput,
): Promise<CompleteStepResult> => {
  const { courseId, stepId, answer } = input

  const [step] = await Promise.all([
    getStepOrThrow(ctx, courseId, stepId),
    verifyEnrollment(ctx, courseId),
  ])

  const stepType = step.type as StepType

  // Валидация: только completable типы
  if (!COMPLETABLE_STEP_TYPES.includes(stepType)) {
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
      isCompleted: true,
      score: stepType === 'FREE_TEXT' ? null : 100,
      answer: answer != null ? (answer as object) : undefined,
      updatedAt: new Date(),
    },
    create: {
      userId: ctx.me.id,
      stepId,
      isCompleted: true,
      score: stepType === 'FREE_TEXT' ? null : 100,
      answer: answer != null ? (answer as object) : undefined,
    },
  })

  return { success: true }
}
