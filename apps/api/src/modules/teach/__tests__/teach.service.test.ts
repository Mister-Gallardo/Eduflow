import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getTeachStatsService } from '../teach.service.js'

describe('teach.service', () => {
  const mockCtx = {
    me: { id: 'teacher-1', sessionId: 'session-1' },
    db: {
      course: {
        count: vi.fn(),
      },
      enrollment: {
        count: vi.fn(),
      },
      userProgress: {
        count: vi.fn(),
      },
    },
    isTokenExpired: false,
    req: {} as any,
    res: {} as any,
  } as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getTeachStatsService', () => {
    it('returns accumulated statistics for teacher courses', async () => {
      mockCtx.db.course.count.mockResolvedValueOnce(5)
      mockCtx.db.enrollment.count.mockResolvedValueOnce(150)
      // _totalCompletedSteps, pendingReviewCount
      mockCtx.db.userProgress.count.mockResolvedValueOnce(300)
      mockCtx.db.userProgress.count.mockResolvedValueOnce(12)

      const result = await getTeachStatsService(mockCtx)

      expect(result).toEqual({
        totalCourses: 5,
        totalStudents: 150,
        totalCompletedSteps: 300,
        pendingReviewCount: 12,
      })
      expect(mockCtx.db.course.count).toHaveBeenCalledWith({ where: { authorId: 'teacher-1' } })
    })

    it('returns zeros if teacher has no stats yet', async () => {
      mockCtx.db.course.count.mockResolvedValueOnce(0)
      mockCtx.db.enrollment.count.mockResolvedValueOnce(0)
      mockCtx.db.userProgress.count.mockResolvedValueOnce(0)
      mockCtx.db.userProgress.count.mockResolvedValueOnce(0)

      const result = await getTeachStatsService(mockCtx)

      expect(result).toEqual({
        totalCourses: 0,
        totalStudents: 0,
        totalCompletedSteps: 0,
        pendingReviewCount: 0,
      })
    })
  })
})
