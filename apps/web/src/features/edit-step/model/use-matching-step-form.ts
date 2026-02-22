import { useState } from 'react'

export interface MatchingPairDraft {
  id: string
  /** Левая часть пары (то, к чему подбирают) */
  left: string
  /** Правая часть пары (правильное соответствие) */
  right: string
}

export interface UseMatchingStepFormReturn {
  pairs: MatchingPairDraft[]
  addPair: () => void
  removePair: (id: string) => void
  updatePairLeft: (id: string, value: string) => void
  updatePairRight: (id: string, value: string) => void
  /** Возвращает MatchingContent для сохранения */
  getContent: () => {
    left: { id: string; content: string }[]
    right: { id: string; content: string }[]
    pairs: { leftId: string; rightId: string }[]
  }
}

/**
 * Хук формы MatchingStep для преподавателя.
 * Преподаватель вводит правильные пары: Left TextField + Right TextField в ряд.
 * SolveMatchingStep сам перемешает правую колонку при инициализации.
 *
 * Зеркалит ID для left/right так, что getContent() формирует полный MatchingContent.
 */
export const useMatchingStepForm = (
  initialPairs?: MatchingPairDraft[],
): UseMatchingStepFormReturn => {
  const defaultPairs = (): MatchingPairDraft[] => [
    { id: crypto.randomUUID(), left: '', right: '' },
    { id: crypto.randomUUID(), left: '', right: '' },
  ]

  const [pairs, setPairs] = useState<MatchingPairDraft[]>(initialPairs ?? defaultPairs())

  const addPair = () => {
    setPairs((prev) => [...prev, { id: crypto.randomUUID(), left: '', right: '' }])
  }

  const removePair = (id: string) => {
    if (pairs.length <= 2) return // минимум 2 пары
    setPairs((prev) => prev.filter((p) => p.id !== id))
  }

  const updatePairLeft = (id: string, value: string) => {
    setPairs((prev) => prev.map((p) => (p.id === id ? { ...p, left: value } : p)))
  }

  const updatePairRight = (id: string, value: string) => {
    setPairs((prev) => prev.map((p) => (p.id === id ? { ...p, right: value } : p)))
  }

  const getContent = () => {
    return {
      left: pairs.map((p) => ({ id: `left-${p.id}`, content: p.left })),
      right: pairs.map((p) => ({ id: `right-${p.id}`, content: p.right })),
      // Правильные пары — для проверки на бэкенде
      pairs: pairs.map((p) => ({ leftId: `left-${p.id}`, rightId: `right-${p.id}` })),
    }
  }

  return {
    pairs,
    addPair,
    removePair,
    updatePairLeft,
    updatePairRight,
    getContent,
  }
}
