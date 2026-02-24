import z from 'zod'

export const zCheckEnrollmentInput = z.object({ courseId: z.string() })

export type CheckEnrollmentInput = z.infer<typeof zCheckEnrollmentInput>
