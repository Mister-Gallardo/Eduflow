import type { Prisma } from '@eduflow/db'
import type {
  CourseEditorData,
  CreateCourseInput,
  CreatedCourse,
  CreateLessonInput,
  CreateModuleInput,
  CreateStepInput,
  DeleteCourseInput,
  DeleteLessonInput,
  DeleteModuleInput,
  DeleteStepInput,
  ReorderLessonsInput,
  ReorderModulesInput,
  ReorderStepsInput,
  UpdateCourseEditorInput,
  UpdateLessonInput,
  UpdateModuleInput,
  UpdateStepInput,
} from '@eduflow/shared'
import { StepContentInputSchema } from '@eduflow/shared'
import { TRPCError } from '@trpc/server'

import type { AuthorizedContext } from '../../trpc/context.js'

import {
  assertCourseOwner,
  assertTeacher,
  getCourseIdByLesson,
  getCourseIdByModule,
  getCourseIdByStep,
} from './lib/utils.js'

// ─── Полное дерево курса для редактора ───

const courseEditorSelect = {
  id: true,
  title: true,
  description: true,
  price: true,
  duration: true,
  level: true,
  category: true,
  modules: {
    orderBy: { order: 'asc' } satisfies Prisma.ModuleOrderByWithRelationInput,
    select: {
      id: true,
      title: true,
      order: true,
      lessons: {
        orderBy: { order: 'asc' } satisfies Prisma.LessonOrderByWithRelationInput,
        select: {
          id: true,
          title: true,
          order: true,
          steps: {
            orderBy: { order: 'asc' } satisfies Prisma.StepOrderByWithRelationInput,
            select: {
              id: true,
              title: true,
              order: true,
              type: true,
              content: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.CourseSelect

export async function getCourseEditorService(
  ctx: AuthorizedContext,
  courseId: string,
): Promise<CourseEditorData> {
  // assertCourseOwner выбросит NOT_FOUND/FORBIDDEN если нет прав
  await assertCourseOwner(ctx, courseId)

  const course = await ctx.db.course.findUnique({
    where: { id: courseId },
    select: courseEditorSelect,
  })

  // После assertCourseOwner курс гарантированно существует
  return course as unknown as CourseEditorData
}

// ─── Course ───

export async function createCourseService(
  ctx: AuthorizedContext,
  input: CreateCourseInput,
): Promise<CreatedCourse> {
  await assertTeacher(ctx)

  return ctx.db.course.create({
    data: {
      ...input,
      authorId: ctx.me.id,
    },
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

export async function updateCourseEditorService(
  ctx: AuthorizedContext,
  input: UpdateCourseEditorInput,
): Promise<CreatedCourse> {
  const { courseId, ...data } = input
  await assertCourseOwner(ctx, courseId)

  return ctx.db.course.update({
    where: { id: courseId },
    data,
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

export async function deleteCourseService(
  ctx: AuthorizedContext,
  input: DeleteCourseInput,
): Promise<void> {
  await assertCourseOwner(ctx, input.courseId)
  await ctx.db.course.delete({ where: { id: input.courseId } })
}

// ─── Module ───

export async function createModuleService(ctx: AuthorizedContext, input: CreateModuleInput) {
  await assertCourseOwner(ctx, input.courseId)

  const lastModule = await ctx.db.module.findFirst({
    where: { courseId: input.courseId },
    orderBy: { order: 'desc' },
    select: { order: true },
  })

  const order = (lastModule?.order ?? -1) + 1

  return ctx.db.module.create({
    data: {
      title: input.title,
      courseId: input.courseId,
      order,
    },
    select: { id: true, title: true, order: true },
  })
}

export async function updateModuleService(ctx: AuthorizedContext, input: UpdateModuleInput) {
  const courseId = await getCourseIdByModule(ctx, input.moduleId)
  await assertCourseOwner(ctx, courseId)

  return ctx.db.module.update({
    where: { id: input.moduleId },
    data: { title: input.title },
    select: { id: true, title: true, order: true },
  })
}

export async function deleteModuleService(
  ctx: AuthorizedContext,
  input: DeleteModuleInput,
): Promise<void> {
  const courseId = await getCourseIdByModule(ctx, input.moduleId)
  await assertCourseOwner(ctx, courseId)
  await ctx.db.module.delete({ where: { id: input.moduleId } })
}

export async function reorderModulesService(
  ctx: AuthorizedContext,
  input: ReorderModulesInput,
): Promise<void> {
  await assertCourseOwner(ctx, input.courseId)

  await ctx.db.$transaction(
    input.orderedIds.map((id, idx) =>
      ctx.db.module.update({
        where: { id },
        data: { order: idx },
      }),
    ),
  )
}

// ─── Lesson ───

export async function createLessonService(ctx: AuthorizedContext, input: CreateLessonInput) {
  const courseId = await getCourseIdByModule(ctx, input.moduleId)
  await assertCourseOwner(ctx, courseId)

  const lastLesson = await ctx.db.lesson.findFirst({
    where: { moduleId: input.moduleId },
    orderBy: { order: 'desc' },
    select: { order: true },
  })

  const order = (lastLesson?.order ?? -1) + 1

  return ctx.db.lesson.create({
    data: {
      title: input.title,
      moduleId: input.moduleId,
      order,
    },
    select: { id: true, title: true, order: true },
  })
}

export async function updateLessonService(ctx: AuthorizedContext, input: UpdateLessonInput) {
  const courseId = await getCourseIdByLesson(ctx, input.lessonId)
  await assertCourseOwner(ctx, courseId)

  return ctx.db.lesson.update({
    where: { id: input.lessonId },
    data: { title: input.title },
    select: { id: true, title: true, order: true },
  })
}

export async function deleteLessonService(
  ctx: AuthorizedContext,
  input: DeleteLessonInput,
): Promise<void> {
  const courseId = await getCourseIdByLesson(ctx, input.lessonId)
  await assertCourseOwner(ctx, courseId)
  await ctx.db.lesson.delete({ where: { id: input.lessonId } })
}

export async function reorderLessonsService(
  ctx: AuthorizedContext,
  input: ReorderLessonsInput,
): Promise<void> {
  const courseId = await getCourseIdByModule(ctx, input.moduleId)
  await assertCourseOwner(ctx, courseId)

  await ctx.db.$transaction(
    input.orderedIds.map((id, idx) =>
      ctx.db.lesson.update({
        where: { id },
        data: { order: idx },
      }),
    ),
  )
}

// ─── Step ───

/** Возвращает дефолтный content для типа шага при создании */
function getDefaultContent(type: CreateStepInput['type']): Prisma.InputJsonValue {
  const map: Record<CreateStepInput['type'], Prisma.InputJsonObject> = {
    TEXT: { html: '' },
    VIDEO: { url: '' },
    TEST_SINGLE: { question: '', options: [] },
    TEST_MULTIPLE: { question: '', options: [] },
    MATCHING: { left: [], right: [], pairs: [] },
    ORDERING: { items: [], correctOrder: [] },
    INPUT_TEXT: { question: '', correctAnswers: [] },
    INPUT_NUMBER: { question: '' },
    FREE_TEXT: { question: '' },
    FILL_GAPS: { text: '', gaps: [] },
  }
  return map[type]
}

export async function createStepService(ctx: AuthorizedContext, input: CreateStepInput) {
  const courseId = await getCourseIdByLesson(ctx, input.lessonId)
  await assertCourseOwner(ctx, courseId)

  const lastStep = await ctx.db.step.findFirst({
    where: { lessonId: input.lessonId },
    orderBy: { order: 'desc' },
    select: { order: true },
  })

  const order = (lastStep?.order ?? -1) + 1

  return ctx.db.step.create({
    data: {
      title: input.title,
      type: input.type,
      content: getDefaultContent(input.type),
      lessonId: input.lessonId,
      order,
    },
    select: { id: true, title: true, order: true, type: true, content: true },
  })
}

export async function updateStepService(ctx: AuthorizedContext, input: UpdateStepInput) {
  const courseId = await getCourseIdByStep(ctx, input.stepId)
  await assertCourseOwner(ctx, courseId)

  // Если контент передан — валидируем по типу текущего шага
  if (input.content !== undefined) {
    const currentStep = await ctx.db.step.findUnique({
      where: { id: input.stepId },
      select: { type: true },
    })

    if (!currentStep) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Шаг не найден' })
    }

    const parseResult = StepContentInputSchema.safeParse({
      type: currentStep.type,
      content: input.content,
    })

    if (!parseResult.success) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Некорректный контент для типа шага ${currentStep.type}`,
      })
    }
  }

  return ctx.db.step.update({
    where: { id: input.stepId },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.content !== undefined && {
        content: input.content as Prisma.InputJsonValue,
      }),
    },
    select: { id: true, title: true, order: true, type: true, content: true },
  })
}

export async function deleteStepService(
  ctx: AuthorizedContext,
  input: DeleteStepInput,
): Promise<void> {
  const courseId = await getCourseIdByStep(ctx, input.stepId)
  await assertCourseOwner(ctx, courseId)
  await ctx.db.step.delete({ where: { id: input.stepId } })
}

export async function reorderStepsService(
  ctx: AuthorizedContext,
  input: ReorderStepsInput,
): Promise<void> {
  const courseId = await getCourseIdByLesson(ctx, input.lessonId)
  await assertCourseOwner(ctx, courseId)

  await ctx.db.$transaction(
    input.orderedIds.map((id, idx) =>
      ctx.db.step.update({
        where: { id },
        data: { order: idx },
      }),
    ),
  )
}
