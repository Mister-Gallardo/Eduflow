import { describe, expect, it } from 'vitest'

import { stripAnswers } from '../utils.js'

describe('stripAnswers — TEXT / VIDEO / FREE_TEXT', () => {
  it('возвращает контент без изменений для TEXT', () => {
    const content = { html: '<p>Учебный материал</p>' }
    const result = stripAnswers(content, 'TEXT')
    expect(result).toEqual(content)
  })

  it('возвращает контент без изменений для VIDEO', () => {
    const content = { url: 'https://example.com/video.mp4' }
    const result = stripAnswers(content, 'VIDEO')
    expect(result).toEqual(content)
  })

  it('возвращает контент без изменений для FREE_TEXT', () => {
    const content = { question: 'Напишите эссе', minLength: 100 }
    const result = stripAnswers(content, 'FREE_TEXT')
    expect(result).toEqual(content)
  })
})

describe('stripAnswers — TEST_SINGLE', () => {
  it('удаляет isCorrect из опций и correctOptionId', () => {
    const content = {
      question: 'Вопрос?',
      options: [
        { id: 'a', text: 'Вариант A', isCorrect: true },
        { id: 'b', text: 'Вариант B', isCorrect: false },
      ],
      correctOptionId: 'a',
    }

    const result = stripAnswers(content, 'TEST_SINGLE')

    expect(result).not.toHaveProperty('correctOptionId')
    for (const opt of result.options as Record<string, unknown>[]) {
      expect(opt).not.toHaveProperty('isCorrect')
    }
    // Остальные поля сохранены
    expect((result.options as { id: string }[])[0].id).toBe('a')
  })
})

describe('stripAnswers — TEST_MULTIPLE', () => {
  it('удаляет isCorrect из опций и correctOptionIds', () => {
    const content = {
      question: 'Выберите несколько',
      options: [
        { id: 'a', text: 'A', isCorrect: true },
        { id: 'b', text: 'B', isCorrect: true },
        { id: 'c', text: 'C', isCorrect: false },
      ],
      correctOptionIds: ['a', 'b'],
    }

    const result = stripAnswers(content, 'TEST_MULTIPLE')

    expect(result).not.toHaveProperty('correctOptionIds')
    for (const opt of result.options as Record<string, unknown>[]) {
      expect(opt).not.toHaveProperty('isCorrect')
    }
  })
})

describe('stripAnswers — MATCHING', () => {
  it('удаляет pairs и перемешивает right', () => {
    const content = {
      left: [{ id: 'l1', content: 'A' }],
      right: [{ id: 'r1', content: 'B' }],
      pairs: [{ leftId: 'l1', rightId: 'r1' }],
    }

    const result = stripAnswers(content, 'MATCHING')

    expect(result).not.toHaveProperty('pairs')
    expect(result.right).toBeDefined()
    expect(result.left).toBeDefined()
  })
})

describe('stripAnswers — ORDERING', () => {
  it('удаляет correctOrder и перемешивает items', () => {
    const content = {
      items: [
        { id: 'i1', content: 'Шаг 1' },
        { id: 'i2', content: 'Шаг 2' },
      ],
      correctOrder: ['i1', 'i2'],
    }

    const result = stripAnswers(content, 'ORDERING')

    expect(result).not.toHaveProperty('correctOrder')
    expect(result.items).toBeDefined()
    expect(result.items).toHaveLength(2)
  })
})

describe('stripAnswers — INPUT_TEXT', () => {
  it('удаляет correctAnswers', () => {
    const content = {
      question: 'Столица?',
      correctAnswers: ['Москва'],
    }

    const result = stripAnswers(content, 'INPUT_TEXT')

    expect(result).not.toHaveProperty('correctAnswers')
    expect(result.question).toBe('Столица?')
  })
})

describe('stripAnswers — INPUT_NUMBER', () => {
  it('удаляет correctAnswer', () => {
    const content = {
      question: '2 + 2 = ?',
      correctAnswer: 4,
    }

    const result = stripAnswers(content, 'INPUT_NUMBER')

    expect(result).not.toHaveProperty('correctAnswer')
    expect(result.question).toBe('2 + 2 = ?')
  })
})

describe('stripAnswers — FILL_GAPS', () => {
  it('удаляет correctAnswer из каждого gap', () => {
    const content = {
      text: 'Пропуски в тексте',
      gaps: [
        { id: 'g1', type: 'text', correctAnswer: 'ответ1' },
        { id: 'g2', type: 'select', options: ['a', 'b'], correctAnswer: 'a' },
      ],
    }

    const result = stripAnswers(content, 'FILL_GAPS')
    const gaps = result.gaps as Record<string, unknown>[]

    for (const gap of gaps) {
      expect(gap).not.toHaveProperty('correctAnswer')
    }
    // Остальные поля сохранены
    expect((gaps[0] as { id: string }).id).toBe('g1')
  })
})

describe('stripAnswers — не мутирует исходный объект', () => {
  it('оригинальный контент остаётся нетронутым', () => {
    const content = {
      question: 'Вопрос',
      correctAnswer: 42,
    }

    const contentCopy = structuredClone(content)
    stripAnswers(content, 'INPUT_NUMBER')

    expect(content).toEqual(contentCopy)
  })
})
