import { Role } from '@eduflow/db'
import { TRPCError } from '@trpc/server'

import type { AuthorizedContext } from '../../../trpc/context.js'

/**
 * Проверяет, что текущий пользователь является преподавателем.
 * Выбрасывает FORBIDDEN, если роль пользователя не TEACHER.
 */
export async function assertTeacher(ctx: AuthorizedContext): Promise<void> {
  const user = await ctx.db.user.findUnique({
    where: { id: ctx.me.id },
    select: { role: true },
  })

  if (user?.role !== Role.TEACHER) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Действие доступно только преподавателям',
    })
  }
}

/**
 * Проверяет, что курс существует и принадлежит текущему автору.
 * Выбрасывает NOT_FOUND или FORBIDDEN при нарушении условий.
 */
export async function assertCourseOwner(ctx: AuthorizedContext, courseId: string): Promise<void> {
  await assertTeacher(ctx)
  const course = await ctx.db.course.findUnique({
    where: { id: courseId },
    select: { authorId: true },
  })

  if (!course) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Курс не найден' })
  }

  if (course.authorId !== ctx.me.id) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Нет прав для редактирования этого курса',
    })
  }
}

/** Получает courseId по moduleId с проверкой существования */
export async function getCourseIdByModule(
  ctx: AuthorizedContext,
  moduleId: string,
): Promise<string> {
  const mod = await ctx.db.module.findUnique({
    where: { id: moduleId },
    select: { courseId: true },
  })

  if (!mod) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Модуль не найден' })
  }

  return mod.courseId
}

/** Получает courseId по lessonId с проверкой существования */
export async function getCourseIdByLesson(
  ctx: AuthorizedContext,
  lessonId: string,
): Promise<string> {
  const lesson = await ctx.db.lesson.findUnique({
    where: { id: lessonId },
    select: { module: { select: { courseId: true } } },
  })

  if (!lesson) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Урок не найден' })
  }

  return lesson.module.courseId
}

/** Получает courseId по stepId с проверкой существования */
export async function getCourseIdByStep(ctx: AuthorizedContext, stepId: string): Promise<string> {
  const step = await ctx.db.step.findUnique({
    where: { id: stepId },
    select: { lesson: { select: { module: { select: { courseId: true } } } } },
  })

  if (!step) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Шаг не найден' })
  }

  return step.lesson.module.courseId
}
