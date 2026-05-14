import { useState } from 'react'

export interface OrderingItemDraft {
  id: string
  content: string
}

export interface UseOrderingStepFormReturn {
  items: OrderingItemDraft[]
  addItem: () => void
  removeItem: (id: string) => void
  updateItem: (id: string, value: string) => void
  /** Возвращает OrderingContent для сохранения */
  getContent: () => {
    items: { id: string; content: string }[]
    correctOrder: string[]
  }
}

/**
 * Хук формы OrderingStep для преподавателя.
 * Преподаватель вводит элементы в ПРАВИЛЬНОМ порядке.
 * SolveOrderingStep перемешает их при показе студенту.
 *
 * Минимум 2 элемента.
 */
export const useOrderingStepForm = (
  initialItems?: OrderingItemDraft[],
): UseOrderingStepFormReturn => {
  const defaultItems = (): OrderingItemDraft[] => [
    { id: crypto.randomUUID(), content: '' },
    { id: crypto.randomUUID(), content: '' },
  ]

  const [items, setItems] = useState<OrderingItemDraft[]>(initialItems ?? defaultItems())

  const addItem = () => {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), content: '' }])
  }

  const removeItem = (id: string) => {
    if (items.length <= 2) return // минимум 2 элемента
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, content: value } : item)))
  }

  const getContent = () => ({
    items: items.map((item) => ({ id: item.id, content: item.content })),
    correctOrder: items.map((item) => item.id),
  })

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    getContent,
  }
}
