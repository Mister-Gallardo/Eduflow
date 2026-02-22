import { useState } from 'react'

export interface TestOptionDraft {
  id: string
  text: string
  isCorrect: boolean
}

export interface UseTestStepFormReturn {
  question: string
  options: TestOptionDraft[]
  setQuestion: (value: string) => void
  addOption: () => void
  removeOption: (id: string) => void
  updateOptionText: (id: string, text: string) => void
  /**
   * Переключает флаг правильного ответа (для TEST_MULTIPLE).
   */
  toggleCorrect: (id: string) => void
  /**
   * Для режима TEST_SINGLE — снимает со всех и ставит на один.
   */
  toggleCorrectSingle: (id: string) => void
  getContent: (testType: 'TEST_SINGLE' | 'TEST_MULTIPLE') => {
    question: string
    options: { id: string; text: string }[]
  }
}

/**
 * Хук формы TestStep для преподавателя.
 * Поддерживает оба режима: TEST_SINGLE и TEST_MULTIPLE.
 * Правильные варианты помечаются локально — фронт знает какие верные,
 * бэкенд получит это при сохранении шага.
 */
export const useTestStepForm = (initial?: {
  question?: string
  options?: TestOptionDraft[]
}): UseTestStepFormReturn => {
  const [question, setQuestion] = useState(initial?.question ?? '')
  const [options, setOptions] = useState<TestOptionDraft[]>(
    initial?.options ?? [
      { id: crypto.randomUUID(), text: '', isCorrect: false },
      { id: crypto.randomUUID(), text: '', isCorrect: false },
    ],
  )

  const addOption = () => {
    setOptions((prev) => [...prev, { id: crypto.randomUUID(), text: '', isCorrect: false }])
  }

  const removeOption = (id: string) => {
    setOptions((prev) => prev.filter((o) => o.id !== id))
  }

  const updateOptionText = (id: string, text: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, text } : o)))
  }

  const toggleCorrect = (id: string) => {
    setOptions((prev) => {
      const target = prev.find((o) => o.id === id)
      if (!target) return prev
      return prev.map((o) => (o.id === id ? { ...o, isCorrect: !o.isCorrect } : o))
    })
  }

  /**
   * Для режима TEST_SINGLE — снимает со всех и ставит на один.
   * Вызывайте вместо toggleCorrect, когда testType === 'TEST_SINGLE'.
   */
  const toggleCorrectSingle = (id: string) => {
    setOptions((prev) => prev.map((o) => ({ ...o, isCorrect: o.id === id })))
  }

  // getContent возвращает контент без isCorrect в публичном API (для preview)
  const getContent = (testType: 'TEST_SINGLE' | 'TEST_MULTIPLE') => ({
    question,
    options: options.map(({ id, text }) => ({ id, text })),
    ...(testType === 'TEST_SINGLE'
      ? { correctOptionId: options.find((o) => o.isCorrect)?.id }
      : { correctOptionIds: options.filter((o) => o.isCorrect).map((o) => o.id) }),
  })

  return {
    question,
    options,
    setQuestion,
    addOption,
    removeOption,
    updateOptionText,
    toggleCorrect,
    toggleCorrectSingle,
    getContent,
  }
}
