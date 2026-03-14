import { z } from 'zod'

// ─── Input Schemas ───

export const zGetRepliesServiceInput = z
  .object({
    status: z.enum(['PENDING', 'APPROVED', 'FAILED']).optional(),
    search: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.number().min(1).max(50).default(20),
  })
  .optional()

export type GetRepliesServiceInput = z.infer<typeof zGetRepliesServiceInput>

export const zReviewReplyInput = z.object({
  id: z.string(),
  status: z.enum(['APPROVED', 'FAILED']),
  comment: z.string().optional(),
})

export type ReviewReplyInput = z.infer<typeof zReviewReplyInput>

// ─── Output Types ───

export interface TeachStats {
  totalCourses: number
  totalStudents: number
  pendingReviewCount: number
  totalCompletedSteps: number
}

export interface TeachCourse {
  id: string
  title: string
  category: string
  updatedAt: Date
  studentsCount: number
  pendingReviewCount: number
}

export interface PendingSubmission {
  id: string
  status: string
  answer: unknown
  updatedAt: Date
  reviewComment: string | null
  reviewedAt: Date | null
  student: {
    id: string
    fullName: string
  }
  step: {
    id: string
    title: string
    type: string
  }
  course: {
    id: string
    title: string
  }
  lesson: {
    title: string
  }
}

export interface PendingSubmissionsResult {
  items: PendingSubmission[]
  nextCursor: string | null
}
