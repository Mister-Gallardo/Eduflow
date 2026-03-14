import { z } from 'zod'

// ─── Step Types (matching Prisma enum) ───

export const StepTypeSchema = z.enum([
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
])

export type StepType = z.infer<typeof StepTypeSchema>

/** Типы шагов, не требующие проверки ответа (просто завершаются) */
export const COMPLETABLE_STEP_TYPES: StepType[] = ['TEXT', 'VIDEO'] as const

/** Типы шагов с автоматической проверкой ответа */
export const CHECKABLE_STEP_TYPES: StepType[] = [
  'TEST_SINGLE',
  'TEST_MULTIPLE',
  'MATCHING',
  'ORDERING',
  'INPUT_TEXT',
  'INPUT_NUMBER',
  'FILL_GAPS',
] as const

/** Ручная проверка: преподаватель должен посмотреть ответ */
export const REVIEWABLE_STEP_TYPES: StepType[] = ['FREE_TEXT'] as const

// ─── Content Schemas ───

export const TextContentSchema = z.object({
  html: z.string(),
})
export type TextContent = z.infer<typeof TextContentSchema>

export const VideoContentSchema = z.object({
  url: z.string(),
})
export type VideoContent = z.infer<typeof VideoContentSchema>

export const TestOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean().optional(),
})

export const TestSingleContentSchema = z.object({
  question: z.string(),
  options: z.array(TestOptionSchema),
  correctOptionId: z.string().optional(),
})
export type TestSingleContent = z.infer<typeof TestSingleContentSchema>

export const TestMultipleContentSchema = z.object({
  question: z.string(),
  options: z.array(TestOptionSchema),
  correctOptionIds: z.array(z.string()).optional(),
})
export type TestMultipleContent = z.infer<typeof TestMultipleContentSchema>

export const MatchingItemSchema = z.object({
  id: z.string(),
  content: z.string(),
})

export const MatchingContentSchema = z.object({
  left: z.array(MatchingItemSchema),
  right: z.array(MatchingItemSchema),
  pairs: z.array(z.object({ leftId: z.string(), rightId: z.string() })).optional(),
})
export type MatchingContent = z.infer<typeof MatchingContentSchema>

export const OrderingItemSchema = z.object({
  id: z.string(),
  content: z.string(),
})

export const OrderingContentSchema = z.object({
  items: z.array(OrderingItemSchema),
  correctOrder: z.array(z.string()).optional(),
})
export type OrderingContent = z.infer<typeof OrderingContentSchema>

export const InputTextContentSchema = z.object({
  question: z.string(),
  correctAnswers: z.array(z.string()).optional(),
})
export type InputTextContent = z.infer<typeof InputTextContentSchema>

export const InputNumberContentSchema = z.object({
  question: z.string(),
  correctAnswer: z.number().optional(),
})
export type InputNumberContent = z.infer<typeof InputNumberContentSchema>

export const FreeTextContentSchema = z.object({
  question: z.string(),
  minLength: z.number().optional(),
})
export type FreeTextContent = z.infer<typeof FreeTextContentSchema>

export const GapItemSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'select']),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
})

export const FillGapsContentSchema = z.object({
  text: z.string(),
  gaps: z.array(GapItemSchema),
})
export type FillGapsContent = z.infer<typeof FillGapsContentSchema>

// ─── Discriminated Union: StepContent ───

export type Step =
  | { type: 'TEXT'; content: TextContent }
  | { type: 'VIDEO'; content: VideoContent }
  | { type: 'TEST_SINGLE'; content: TestSingleContent }
  | { type: 'TEST_MULTIPLE'; content: TestMultipleContent }
  | { type: 'MATCHING'; content: MatchingContent }
  | { type: 'ORDERING'; content: OrderingContent }
  | { type: 'INPUT_TEXT'; content: InputTextContent }
  | { type: 'INPUT_NUMBER'; content: InputNumberContent }
  | { type: 'FREE_TEXT'; content: FreeTextContent }
  | { type: 'FILL_GAPS'; content: FillGapsContent }

export const StepStatusSchema = z.enum(['NOT_STARTED', 'PENDING', 'FAILED', 'APPROVED'])

export type StepStatus = z.infer<typeof StepStatusSchema>

// ─── Answer Types ───

/**
 * Все возможные форматы ответов юзера:
 * - string: TEST_SINGLE, INPUT_TEXT
 * - number: INPUT_NUMBER
 * - string[]: TEST_MULTIPLE, ORDERING
 * - Record<string, string>: MATCHING (leftId→rightId), FILL_GAPS (gapId→value)
 */
export const StepAnswerSchema = z.union([
  z.string(),
  z.number(),
  z.array(z.string()),
  z.record(z.string(), z.string()),
])

export type StepAnswer = z.infer<typeof StepAnswerSchema>

// ─── Input Schemas ───

export const zEnrollCourseInput = z.object({ courseId: z.string() })
export type EnrollCourseInput = z.infer<typeof zEnrollCourseInput>

export const zGetCourseNavigationInput = z.object({ courseId: z.string() })
export type GetCourseNavigationInput = z.infer<typeof zGetCourseNavigationInput>

export const zGetStepDataInput = z.object({ courseId: z.string(), stepId: z.string() })
export type GetStepDataInput = z.infer<typeof zGetStepDataInput>

export const zCheckStepInput = z.object({
  courseId: z.string(),
  stepId: z.string(),
  answer: StepAnswerSchema,
})
export type CheckStepInput = z.infer<typeof zCheckStepInput>

export const zCompleteStepInput = z.object({
  courseId: z.string(),
  stepId: z.string(),
  answer: StepAnswerSchema.optional(),
})
export type CompleteStepInput = z.infer<typeof zCompleteStepInput>

// ─── Output Types ───

export interface CheckStepResult {
  isCorrect: boolean
}

export interface CompleteStepResult {
  success: true
}
