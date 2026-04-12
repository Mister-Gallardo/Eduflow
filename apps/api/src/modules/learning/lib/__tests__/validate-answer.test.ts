import { describe, expect, it } from 'vitest'

import { validateAnswer } from '../utils.js'

// ─── TEST_SINGLE ───

describe('validateAnswer — TEST_SINGLE', () => {
  const content = {
    question: 'Какой язык используется в Eduflow?',
    options: [
      { id: 'opt-1', text: 'Python', isCorrect: false },
      { id: 'opt-2', text: 'TypeScript', isCorrect: true },
      { id: 'opt-3', text: 'Java', isCorrect: false },
    ],
    correctOptionId: 'opt-2',
  }

  it('возвращает isCorrect: true при правильном ответе', () => {
    const result = validateAnswer(content, 'TEST_SINGLE', 'opt-2')
    expect(result).toEqual({ isCorrect: true })
  })

  it('возвращает isCorrect: false при неправильном ответе', () => {
    const result = validateAnswer(content, 'TEST_SINGLE', 'opt-1')
    expect(result).toEqual({ isCorrect: false })
  })

  it('возвращает isCorrect: false при пустой строке', () => {
    const result = validateAnswer(content, 'TEST_SINGLE', '')
    expect(result).toEqual({ isCorrect: false })
  })
})

// ─── TEST_MULTIPLE ───

describe('validateAnswer — TEST_MULTIPLE', () => {
  const content = {
    question: 'Выберите фреймворки JavaScript',
    options: [
      { id: 'opt-1', text: 'React', isCorrect: true },
      { id: 'opt-2', text: 'Django', isCorrect: false },
      { id: 'opt-3', text: 'Vue', isCorrect: true },
    ],
    correctOptionIds: ['opt-1', 'opt-3'],
  }

  it('возвращает isCorrect: true при всех правильных ответах', () => {
    const result = validateAnswer(content, 'TEST_MULTIPLE', ['opt-1', 'opt-3'])
    expect(result).toEqual({ isCorrect: true })
  })

  it('возвращает isCorrect: false при неполном наборе ответов', () => {
    const result = validateAnswer(content, 'TEST_MULTIPLE', ['opt-1'])
    expect(result).toEqual({ isCorrect: false })
  })

  it('возвращает isCorrect: false при лишнем ответе', () => {
    const result = validateAnswer(content, 'TEST_MULTIPLE', ['opt-1', 'opt-2', 'opt-3'])
    expect(result).toEqual({ isCorrect: false })
  })

  it('не зависит от порядка ответов', () => {
    const result = validateAnswer(content, 'TEST_MULTIPLE', ['opt-3', 'opt-1'])
    expect(result).toEqual({ isCorrect: true })
  })
})

// ─── MATCHING ───

describe('validateAnswer — MATCHING', () => {
  const content = {
    left: [
      { id: 'l1', content: 'React' },
      { id: 'l2', content: 'Express' },
    ],
    right: [
      { id: 'r1', content: 'Frontend' },
      { id: 'r2', content: 'Backend' },
    ],
    pairs: [
      { leftId: 'l1', rightId: 'r1' },
      { leftId: 'l2', rightId: 'r2' },
    ],
  }

  it('возвращает isCorrect: true при правильных парах', () => {
    const result = validateAnswer(content, 'MATCHING', { l1: 'r1', l2: 'r2' })
    expect(result).toEqual({ isCorrect: true })
  })

  it('возвращает isCorrect: false при перепутанных парах', () => {
    const result = validateAnswer(content, 'MATCHING', { l1: 'r2', l2: 'r1' })
    expect(result).toEqual({ isCorrect: false })
  })

  it('возвращает isCorrect: false при неполных парах', () => {
    const result = validateAnswer(content, 'MATCHING', { l1: 'r1' })
    expect(result).toEqual({ isCorrect: false })
  })
})

// ─── ORDERING ───

describe('validateAnswer — ORDERING', () => {
  const content = {
    items: [
      { id: 'i1', content: 'Шаг 1' },
      { id: 'i2', content: 'Шаг 2' },
      { id: 'i3', content: 'Шаг 3' },
    ],
    correctOrder: ['i1', 'i2', 'i3'],
  }

  it('возвращает isCorrect: true при правильном порядке', () => {
    const result = validateAnswer(content, 'ORDERING', ['i1', 'i2', 'i3'])
    expect(result).toEqual({ isCorrect: true })
  })

  it('возвращает isCorrect: false при неправильном порядке', () => {
    const result = validateAnswer(content, 'ORDERING', ['i3', 'i1', 'i2'])
    expect(result).toEqual({ isCorrect: false })
  })
})

// ─── INPUT_TEXT ───

describe('validateAnswer — INPUT_TEXT', () => {
  const content = {
    question: 'Столица России?',
    correctAnswers: ['Москва', 'москва'],
  }

  it('возвращает isCorrect: true при точном ответе', () => {
    const result = validateAnswer(content, 'INPUT_TEXT', 'Москва')
    expect(result).toEqual({ isCorrect: true })
  })

  it('не учитывает регистр', () => {
    const result = validateAnswer(content, 'INPUT_TEXT', 'МОСКВА')
    expect(result).toEqual({ isCorrect: true })
  })

  it('игнорирует лишние пробелы', () => {
    const result = validateAnswer(content, 'INPUT_TEXT', '  Москва  ')
    expect(result).toEqual({ isCorrect: true })
  })

  it('возвращает isCorrect: false при неправильном ответе', () => {
    const result = validateAnswer(content, 'INPUT_TEXT', 'Петербург')
    expect(result).toEqual({ isCorrect: false })
  })
})

// ─── INPUT_NUMBER ───

describe('validateAnswer — INPUT_NUMBER', () => {
  const content = {
    question: 'Сколько будет 2 + 2?',
    correctAnswer: 4,
  }

  it('возвращает isCorrect: true при правильном числе', () => {
    const result = validateAnswer(content, 'INPUT_NUMBER', 4)
    expect(result).toEqual({ isCorrect: true })
  })

  it('принимает строковое представление числа', () => {
    const result = validateAnswer(content, 'INPUT_NUMBER', '4')
    expect(result).toEqual({ isCorrect: true })
  })

  it('возвращает isCorrect: false при неправильном числе', () => {
    const result = validateAnswer(content, 'INPUT_NUMBER', 5)
    expect(result).toEqual({ isCorrect: false })
  })
})

// ─── FILL_GAPS ───

describe('validateAnswer — FILL_GAPS', () => {
  const content = {
    text: 'Язык ___ используется для типизации',
    gaps: [
      { id: 'g1', type: 'text', correctAnswer: 'TypeScript' },
      { id: 'g2', type: 'text', correctAnswer: 'JavaScript' },
    ],
  }

  it('возвращает isCorrect: true при всех правильных пропусках', () => {
    const result = validateAnswer(content, 'FILL_GAPS', {
      g1: 'TypeScript',
      g2: 'JavaScript',
    })
    expect(result).toEqual({ isCorrect: true })
  })

  it('не учитывает регистр', () => {
    const result = validateAnswer(content, 'FILL_GAPS', {
      g1: 'typescript',
      g2: 'javascript',
    })
    expect(result).toEqual({ isCorrect: true })
  })

  it('возвращает isCorrect: false при ошибке хотя бы в одном пропуске', () => {
    const result = validateAnswer(content, 'FILL_GAPS', {
      g1: 'TypeScript',
      g2: 'Python',
    })
    expect(result).toEqual({ isCorrect: false })
  })
})
