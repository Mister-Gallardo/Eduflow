import { z } from 'zod'

// Types of steps - matching Prisma enum
export const StepTypeSchema = z.enum([
  'TEXT',
  'VIDEO',
  'TEXT_IMAGE',
  'TEXT_VIDEO',
  'TEST_SINGLE',
  'TEST_MULTIPLE',
  'MATCHING',
  'ORDERING',
  'INPUT_TEXT',
  'INPUT_NUMBER',
  'FREE_TEXT',
  'FILL_GAPS',
  'TABLE',
])

export type StepType = z.infer<typeof StepTypeSchema>

// --- Content Schemas ---

// Base for all content
const BaseContent = z.object({
  description: z.string().optional(),
})

export const TextContent = BaseContent.extend({ body: z.string() })
export const VideoContent = BaseContent.extend({
  url: z.string(),
  provider: z.enum(['youtube', 'vimeo', 'native']),
})
export const TextImageContent = BaseContent.extend({ body: z.string(), imageUrl: z.string() })
export const TextVideoContent = BaseContent.extend({ body: z.string(), videoUrl: z.string() })

export const TestOption = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean().optional(),
})
export const TestSingleContent = BaseContent.extend({
  question: z.string(),
  options: z.array(TestOption),
  correctOptionId: z.string().optional(), // Can be stored here or via isCorrect in options
})
export const TestMultipleContent = BaseContent.extend({
  question: z.string(),
  options: z.array(TestOption),
  correctOptionIds: z.array(z.string()).optional(),
})

export const MatchingItem = z.object({ id: z.string(), content: z.string() })
export const MatchingContent = BaseContent.extend({
  left: z.array(MatchingItem),
  right: z.array(MatchingItem), // In DB, this is the correct pair if index matches, or we store pairs explicit via ID
  pairs: z.array(z.object({ leftId: z.string(), rightId: z.string() })).optional(), // Source of truth
})

export const OrderingItem = z.object({ id: z.string(), content: z.string() })
export const OrderingContent = BaseContent.extend({
  items: z.array(OrderingItem),
  correctOrder: z.array(z.string()).optional(), // Array of IDs in correct order
})

export const InputTextContent = BaseContent.extend({
  question: z.string(),
  correctAnswers: z.array(z.string()).optional(), // Array of valid text answers
})
export const InputNumberContent = BaseContent.extend({
  question: z.string(),
  correctAnswer: z.number().optional(),
})
export const FreeTextContent = BaseContent.extend({
  question: z.string(),
  minLength: z.number().optional(),
})

export const GapItem = z.object({
  id: z.string(),
  type: z.enum(['text', 'select']), // manual or dropdown
  options: z.array(z.string()).optional(), // for select
  correctAnswer: z.string().optional(),
})
// Text with placeholders like {{id}}
export const FillGapsContent = BaseContent.extend({
  text: z.string(),
  gaps: z.array(GapItem),
})

export const TableCell = z.object({ id: z.string(), text: z.string() })
export const TableRow = z.object({ id: z.string(), cells: z.array(TableCell) })
export const TableContent = BaseContent.extend({
  rows: z.array(TableRow),
  columns: z.array(z.string()), // Headers
  correctCells: z.array(z.string()).optional(), // IDs of cells that should be selected
})

// --- Input/Output Schemas ---

export const zEnrollCourseInput = z.object({ courseId: z.string() })
export type EnrollCourseInput = z.infer<typeof zEnrollCourseInput>

export const zGetCourseNavigationInput = z.object({ courseId: z.string() })
export type GetCourseNavigationInput = z.infer<typeof zGetCourseNavigationInput>

export const zGetStepDataInput = z.object({ stepId: z.string() })
export type GetStepDataInput = z.infer<typeof zGetStepDataInput>

export const AnswerSchema = z.union([
  z.string(), // TEST_SINGLE, INPUT_TEXT
  z.number(), // INPUT_NUMBER
  z.array(z.string()), // TEST_MULTIPLE, ORDERING, TABLE
  z.record(z.string(), z.string()), // MATCHING (leftId -> rightId), FILL_GAPS (gapId -> value)
  z.any(), // Fallback to satisfy min 2 args if needed, or better, structure it correctly.
])

export const zCheckStepInput = z.object({
  stepId: z.string(),
  answer: z.any(), // We validate strictly in service based on step type
})
export type CheckStepInput = z.infer<typeof zCheckStepInput>
