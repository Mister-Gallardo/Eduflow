import { z } from 'zod'

import { COURSE_CATEGORIES, COURSE_LEVELS } from './courses.schema.js'
import type { StepTypeSchema } from './learning.schema.js'
import {
  FillGapsContentSchema,
  FreeTextContentSchema,
  InputNumberContentSchema,
  InputTextContentSchema,
  MatchingContentSchema,
  OrderingContentSchema,
  TestMultipleContentSchema,
  TestSingleContentSchema,
  TextContentSchema,
  VideoContentSchema,
} from './learning.schema.js'

// ─── Типы шагов, доступные в редакторе (ORDERING и FILL_GAPS пропущены) ───

export const EDITOR_STEP_TYPES = [
  'TEXT',
  'VIDEO',
  'TEST_SINGLE',
  'TEST_MULTIPLE',
  'MATCHING',
  'ORDERING',
  'INPUT_TEXT',
  'INPUT_NUMBER',
  'FREE_TEXT',
  'FILL_GAPS',
] as const

export const EditorStepTypeSchema = z.enum(EDITOR_STEP_TYPES)
export type EditorStepType = z.infer<typeof EditorStepTypeSchema>

// ─── Content — discriminated union для валидации при создании/обновлении шага ───

export const StepContentInputSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('TEXT'), content: TextContentSchema }),
  z.object({ type: z.literal('VIDEO'), content: VideoContentSchema }),
  z.object({ type: z.literal('TEST_SINGLE'), content: TestSingleContentSchema }),
  z.object({ type: z.literal('TEST_MULTIPLE'), content: TestMultipleContentSchema }),
  z.object({ type: z.literal('MATCHING'), content: MatchingContentSchema }),
  z.object({ type: z.literal('ORDERING'), content: OrderingContentSchema }),
  z.object({ type: z.literal('INPUT_TEXT'), content: InputTextContentSchema }),
  z.object({ type: z.literal('INPUT_NUMBER'), content: InputNumberContentSchema }),
  z.object({ type: z.literal('FREE_TEXT'), content: FreeTextContentSchema }),
  z.object({ type: z.literal('FILL_GAPS'), content: FillGapsContentSchema }),
])

export type StepContentInput = z.infer<typeof StepContentInputSchema>

// ─── Course ───

export const zCreateCourseInput = z.object({
  title: z.string().min(1, 'Название обязательно').max(200),
  description: z.string().min(1, 'Описание обязательно').max(2000),
  price: z.coerce.number().min(0, 'Цена не может быть отрицательной').default(0),
  duration: z.coerce.number().min(0, 'Время не может быть отрицательным').default(0),
  level: z.enum(COURSE_LEVELS),
  category: z.enum(COURSE_CATEGORIES),
})
export type CreateCourseInput = z.infer<typeof zCreateCourseInput>

export const zUpdateCourseEditorInput = z.object({
  courseId: z.string(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  price: z.coerce.number().min(0).optional(),
  duration: z.coerce.number().min(0).optional(),
  level: z.enum(COURSE_LEVELS).optional(),
  category: z.enum(COURSE_CATEGORIES).optional(),
})
export type UpdateCourseEditorInput = z.infer<typeof zUpdateCourseEditorInput>

export const zDeleteCourseInput = z.object({ courseId: z.string() })
export type DeleteCourseInput = z.infer<typeof zDeleteCourseInput>

// ─── Module ───

export const zCreateModuleInput = z.object({
  courseId: z.string(),
  title: z.string().min(1, 'Название модуля обязательно').max(200),
})
export type CreateModuleInput = z.infer<typeof zCreateModuleInput>

export const zUpdateModuleInput = z.object({
  moduleId: z.string(),
  title: z.string().min(1).max(200),
})
export type UpdateModuleInput = z.infer<typeof zUpdateModuleInput>

export const zDeleteModuleInput = z.object({ moduleId: z.string() })
export type DeleteModuleInput = z.infer<typeof zDeleteModuleInput>

export const zReorderModulesInput = z.object({
  courseId: z.string(),
  /** Все moduleId курса в новом порядке */
  orderedIds: z.array(z.string()).min(1),
})
export type ReorderModulesInput = z.infer<typeof zReorderModulesInput>

// ─── Lesson ───

export const zCreateLessonInput = z.object({
  moduleId: z.string(),
  title: z.string().min(1, 'Название урока обязательно').max(200),
})
export type CreateLessonInput = z.infer<typeof zCreateLessonInput>

export const zUpdateLessonInput = z.object({
  lessonId: z.string(),
  title: z.string().min(1).max(200),
})
export type UpdateLessonInput = z.infer<typeof zUpdateLessonInput>

export const zDeleteLessonInput = z.object({ lessonId: z.string() })
export type DeleteLessonInput = z.infer<typeof zDeleteLessonInput>

export const zReorderLessonsInput = z.object({
  moduleId: z.string(),
  /** Все lessonId модуля в новом порядке */
  orderedIds: z.array(z.string()).min(1),
})
export type ReorderLessonsInput = z.infer<typeof zReorderLessonsInput>

// ─── Step ───

export const zCreateStepInput = z.object({
  lessonId: z.string(),
  title: z.string().min(1, 'Название шага обязательно').max(200),
  type: EditorStepTypeSchema,
})
export type CreateStepInput = z.infer<typeof zCreateStepInput>

/** Обновление шага: title и/или content (content — raw Json, валидируется сервисом по type) */
export const zUpdateStepInput = z.object({
  stepId: z.string(),
  title: z.string().min(1).max(200).optional(),
  content: z.record(z.string(), z.unknown()).optional(),
})
export type UpdateStepInput = z.infer<typeof zUpdateStepInput>

export const zDeleteStepInput = z.object({ stepId: z.string() })
export type DeleteStepInput = z.infer<typeof zDeleteStepInput>

export const zReorderStepsInput = z.object({
  lessonId: z.string(),
  /** Все stepId урока в новом порядке */
  orderedIds: z.array(z.string()).min(1),
})
export type ReorderStepsInput = z.infer<typeof zReorderStepsInput>

// ─── Get Course Editor ───

export const zGetCourseEditorInput = z.object({ courseId: z.string() })
export type GetCourseEditorInput = z.infer<typeof zGetCourseEditorInput>

// ─── Output Types ───

export interface StepEditorItem {
  id: string
  title: string
  order: number
  type: z.infer<typeof StepTypeSchema>
  content: unknown
}

export interface LessonEditorItem {
  id: string
  title: string
  order: number
  steps: StepEditorItem[]
}

export interface ModuleEditorItem {
  id: string
  title: string
  order: number
  lessons: LessonEditorItem[]
}

export interface CourseEditorData {
  id: string
  title: string
  description: string
  price: number
  duration: number
  level: string
  category: string
  modules: ModuleEditorItem[]
}

export interface CreatedCourse {
  id: string
  title: string
  description: string
  price: number
  duration: number
  level: string
  category: string
}
