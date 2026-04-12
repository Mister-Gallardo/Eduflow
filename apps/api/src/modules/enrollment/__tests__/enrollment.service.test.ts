import { TRPCError } from '@trpc/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { checkEnrollmentService, enrollService } from '../enrollment.service.js'

describe('enrollment.service', () => {
  const mockCtx = {
    me: { id: 'user-1', sessionId: 'session-1' },
    db: {
      course: {
        findUnique: vi.fn(),
      },
      enrollment: {
        findUnique: vi.fn(),
        create: vi.fn(),
        findMany: vi.fn(),
      },
      userProgress: {
        findMany: vi.fn(),
      },
    },
    isTokenExpired: false,
    req: {} as any,
    res: {} as any,
  } as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('enrollService', () => {
    it('creates enrollment successfully', async () => {
      mockCtx.db.course.findUnique.mockResolvedValueOnce({ id: 'course-1' })
      mockCtx.db.enrollment.findUnique.mockResolvedValueOnce(null)
      mockCtx.db.enrollment.create.mockResolvedValueOnce({ id: 'enrollment-1' })

      const result = await enrollService(mockCtx, { courseId: 'course-1' })

      expect(result).toEqual({ success: true })
      expect(mockCtx.db.enrollment.create).toHaveBeenCalledWith({
        data: { userId: 'user-1', courseId: 'course-1' },
      })
    })

    it('returns success message if already enrolled', async () => {
      mockCtx.db.course.findUnique.mockResolvedValueOnce({ id: 'course-1' })
      mockCtx.db.enrollment.findUnique.mockResolvedValueOnce({ id: 'enrollment-1' })

      const result = await enrollService(mockCtx, { courseId: 'course-1' })

      expect(result).toEqual({ success: true, message: 'Already enrolled' })
      expect(mockCtx.db.enrollment.create).not.toHaveBeenCalled()
    })

    it('throws NOT_FOUND if course does not exist', async () => {
      mockCtx.db.course.findUnique.mockResolvedValueOnce(null)

      await expect(enrollService(mockCtx, { courseId: 'course-1' })).rejects.toThrow(TRPCError)
      await expect(enrollService(mockCtx, { courseId: 'course-1' })).rejects.toThrow(
        'Course not found',
      )
    })
  })

  describe('checkEnrollmentService', () => {
    it('returns enrollment if user is enrolled', async () => {
      const mockEnrollment = { id: 'enrollment-1', courseId: 'course-1', userId: 'user-1' }
      mockCtx.db.enrollment.findUnique.mockResolvedValueOnce(mockEnrollment)

      const result = await checkEnrollmentService(mockCtx, { courseId: 'course-1' })

      expect(result).toEqual(mockEnrollment)
    })

    it('throws FORBIDDEN if user is not enrolled', async () => {
      mockCtx.db.enrollment.findUnique.mockResolvedValueOnce(null)

      await expect(checkEnrollmentService(mockCtx, { courseId: 'course-1' })).rejects.toThrow(
        TRPCError,
      )
      await expect(checkEnrollmentService(mockCtx, { courseId: 'course-1' })).rejects.toThrow(
        'Not enrolled in this course',
      )
    })
  })
})
