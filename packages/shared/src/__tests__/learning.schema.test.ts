import { describe, expect, it } from 'vitest'

import {
  FillGapsContentSchema,
  InputNumberContentSchema,
  InputTextContentSchema,
  MatchingContentSchema,
  OrderingContentSchema,
  StepAnswerSchema,
  TestSingleContentSchema,
  zCheckStepInput,
} from '../learning.schema.js'

// ─── StepAnswerSchema ───

describe('StepAnswerSchema', () => {
  it('принимает строку', () => {
    expect(StepAnswerSchema.safeParse('opt-1').success).toBe(true)
  })

  it('принимает число', () => {
    expect(StepAnswerSchema.safeParse(42).success).toBe(true)
  })

  it('принимает массив строк', () => {
    expect(StepAnswerSchema.safeParse(['a', 'b']).success).toBe(true)
  })

  it('принимает Record<string, string>', () => {
    expect(StepAnswerSchema.safeParse({ g1: 'answer' }).success).toBe(true)
  })

  it('отклоняет boolean', () => {
    expect(StepAnswerSchema.safeParse(true).success).toBe(false)
  })

  it('отклоняет null', () => {
    expect(StepAnswerSchema.safeParse(null).success).toBe(false)
  })
})

// ─── zCheckStepInput ───

describe('zCheckStepInput', () => {
  it('пропускает корректные данные', () => {
    const result = zCheckStepInput.safeParse({
      courseId: 'course-1',
      stepId: 'step-1',
      answer: 'opt-1',
    })
    expect(result.success).toBe(true)
  })

  it('отклоняет без courseId', () => {
    const result = zCheckStepInput.safeParse({
      stepId: 'step-1',
      answer: 'opt-1',
    })
    expect(result.success).toBe(false)
  })

  it('отклоняет без answer', () => {
    const result = zCheckStepInput.safeParse({
      courseId: 'course-1',
      stepId: 'step-1',
    })
    expect(result.success).toBe(false)
  })
})

// ─── Content Schemas ───

describe('TestSingleContentSchema', () => {
  it('валидирует корректный контент теста', () => {
    const result = TestSingleContentSchema.safeParse({
      question: 'Вопрос?',
      options: [{ id: '1', text: 'Вариант' }],
    })
    expect(result.success).toBe(true)
  })

  it('отклоняет без question', () => {
    const result = TestSingleContentSchema.safeParse({
      options: [{ id: '1', text: 'Вариант' }],
    })
    expect(result.success).toBe(false)
  })
})

describe('MatchingContentSchema', () => {
  it('валидирует корректный контент сопоставления', () => {
    const result = MatchingContentSchema.safeParse({
      left: [{ id: 'l1', content: 'A' }],
      right: [{ id: 'r1', content: 'B' }],
    })
    expect(result.success).toBe(true)
  })
})

describe('OrderingContentSchema', () => {
  it('валидирует корректный контент упорядочивания', () => {
    const result = OrderingContentSchema.safeParse({
      items: [{ id: 'i1', content: 'Шаг 1' }],
    })
    expect(result.success).toBe(true)
  })
})

describe('InputTextContentSchema', () => {
  it('валидирует корректный контент текстового ввода', () => {
    const result = InputTextContentSchema.safeParse({
      question: 'Введите ответ',
    })
    expect(result.success).toBe(true)
  })
})

describe('InputNumberContentSchema', () => {
  it('валидирует корректный контент числового ввода', () => {
    const result = InputNumberContentSchema.safeParse({
      question: 'Введите число',
      correctAnswer: 42,
    })
    expect(result.success).toBe(true)
  })
})

describe('FillGapsContentSchema', () => {
  it('валидирует корректный контент заполнения пропусков', () => {
    const result = FillGapsContentSchema.safeParse({
      text: 'Текст с пропусками',
      gaps: [{ id: 'g1', type: 'text' }],
    })
    expect(result.success).toBe(true)
  })

  it('отклоняет gap с неизвестным type', () => {
    const result = FillGapsContentSchema.safeParse({
      text: 'Текст',
      gaps: [{ id: 'g1', type: 'unknown' }],
    })
    expect(result.success).toBe(false)
  })
})
