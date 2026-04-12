import { beforeEach, describe, expect, it, vi } from 'vitest'

import { checkStepService } from '../learning.service.js'
import * as validationUtils from '../lib/utils.js'

vi.mock('../lib/utils.js', () => ({
  validateAnswer: vi.fn(),
  stripAnswers: vi.fn(),
}))

vi.mock('../enrollment/enrollment.service.js', () => ({
  checkEnrollmentService: vi.fn().mockResolvedValue(true),
}))

vi.mock('../learning.repository.js', () => ({
  getStepOrThrow: vi.fn().mockImplementation((_ctx, _courseId, stepId) => {
    return {
      id: stepId,
      type: 'TEST_SINGLE',
      content: { question: 'test?' },
    }
  }),
}))

describe('learning.service', () => {
  const mockCtx = {
    me: { id: 'user-1', sessionId: 'session-1' },
    db: {
      userProgress: {
        findUnique: vi.fn(),
        upsert: vi.fn(),
      },
      step: {
        findUnique: vi.fn(),
      },
      enrollment: {
        findUnique: vi.fn(),
      },
    },
    isTokenExpired: false,
    req: {} as any,
    res: {} as any,
  } as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('checkStepService', () => {
    it('returns isCorrect: true and updates progress on valid answer', async () => {
      vi.mocked(validationUtils.validateAnswer).mockReturnValueOnce({ isCorrect: true })
      mockCtx.db.userProgress.findUnique.mockResolvedValueOnce(null)
      mockCtx.db.userProgress.upsert.mockResolvedValueOnce({ id: 'prog-1' })
      mockCtx.db.enrollment.findUnique.mockResolvedValueOnce({ id: 'enr-1' })

      const result = await checkStepService(mockCtx, {
        courseId: 'course-1',
        stepId: 'step-1',
        answer: 'opt-1',
      })

      expect(result).toEqual({ isCorrect: true })
      expect(mockCtx.db.userProgress.upsert).toHaveBeenCalled()
    })

    it('returns isCorrect: false and updates progress on invalid answer', async () => {
      vi.mocked(validationUtils.validateAnswer).mockReturnValueOnce({ isCorrect: false })
      mockCtx.db.userProgress.findUnique.mockResolvedValueOnce(null)
      mockCtx.db.userProgress.upsert.mockResolvedValueOnce({ id: 'prog-1' })
      mockCtx.db.enrollment.findUnique.mockResolvedValueOnce({ id: 'enr-1' })

      const result = await checkStepService(mockCtx, {
        courseId: 'course-1',
        stepId: 'step-1',
        answer: 'opt-2',
      })

      expect(result).toEqual({ isCorrect: false })
      expect(mockCtx.db.userProgress.upsert).toHaveBeenCalled()
    })
  })
})
