import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useInputStep } from '../use-input-step'

// Мокаем TRPC action, так как нам нужна только локальная логика хука
const mockMutate = vi.fn()
const mockSetIsSubmitted = vi.fn()
const mockSetIsCorrect = vi.fn()

vi.mock('../use-step-action', () => ({
  useStepAction: () => ({
    isSubmitted: false,
    isCorrect: false,
    isPending: false,
    mutate: mockMutate,
    setIsSubmitted: mockSetIsSubmitted,
    setIsCorrect: mockSetIsCorrect,
  }),
}))

describe('useInputStep', () => {
  const defaultProps = {
    content: { question: 'test?' },
    stepType: 'INPUT_TEXT' as const,
    courseId: 'c1',
    stepId: 's1',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with empty value if no savedAnswer', () => {
    const { result } = renderHook(() => useInputStep(defaultProps))

    expect(result.current.value).toBe('')
    expect(result.current.canCheck).toBe(false)
  })

  it('initializes with string value if savedAnswer provided', () => {
    const { result } = renderHook(() =>
      useInputStep({ ...defaultProps, savedAnswer: 'test answer' }),
    )

    expect(result.current.value).toBe('test answer')
    expect(result.current.canCheck).toBe(true)
  })

  it('updates value correctly text and becomes checable', () => {
    const { result } = renderHook(() => useInputStep(defaultProps))

    act(() => {
      result.current.onChange('new test answer')
    })

    expect(result.current.value).toBe('new test answer')
    expect(result.current.canCheck).toBe(true)
  })

  it('calls mutate on handleCheck with correct value', () => {
    const { result } = renderHook(() => useInputStep({ ...defaultProps, savedAnswer: 'valid' }))

    act(() => {
      result.current.onCheck()
    })

    expect(mockMutate).toHaveBeenCalledWith({
      courseId: 'c1',
      stepId: 's1',
      answer: 'valid',
    })
  })

  it('does not call mutate if value is purely whitespace', () => {
    const { result } = renderHook(() => useInputStep(defaultProps))

    act(() => {
      result.current.onChange('   ')
    })

    expect(result.current.canCheck).toBe(false)

    act(() => {
      result.current.onCheck()
    })

    expect(mockMutate).not.toHaveBeenCalled()
  })
})
