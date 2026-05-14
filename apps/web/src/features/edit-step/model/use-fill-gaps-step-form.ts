import { useState } from 'react'

/**
 * Парсит текст с пропусками: `Столица Франции — {{Париж}}`
 * Извлекает gap-ы и возвращает текст с маркерами `{{gap-id}}` + массив gap-ов.
 */
const GAP_REGEX = /\{\{(.+?)\}\}/g

export interface UseFillGapsStepFormReturn {
  /** Сырой текст с {{ответами}} */
  rawText: string
  setRawText: (value: string) => void
  /** Количество найденных пропусков */
  gapCount: number
  /** Возвращает FillGapsContent для сохранения */
  getContent: () => {
    text: string
    gaps: { id: string; type: 'text'; correctAnswer: string }[]
  }
}

/**
 * Хук формы FillGapsStep для преподавателя.
 *
 * Преподаватель пишет текст, оборачивая правильные ответы в двойные фигурные скобки:
 *   `Столица Франции — {{Париж}}, а столица Германии — {{Берлин}}`
 *
 * При сохранении парсим текст:
 * - text: `Столица Франции — {{gap-1}}, а столица Германии — {{gap-2}}`
 * - gaps: [{ id: "gap-1", type: "text", correctAnswer: "Париж" }, ...]
 */
export const useFillGapsStepForm = (initialRawText?: string): UseFillGapsStepFormReturn => {
  const [rawText, setRawText] = useState(initialRawText ?? '')

  const matches = [...rawText.matchAll(GAP_REGEX)]
  const gapCount = matches.length

  const getContent = () => {
    const gaps: { id: string; type: 'text'; correctAnswer: string }[] = []
    let gapIndex = 0

    const text = rawText.replace(GAP_REGEX, (_match, answer: string) => {
      const id = `gap-${gapIndex + 1}`
      gaps.push({ id, type: 'text', correctAnswer: answer.trim() })
      gapIndex++
      return `{{${id}}}`
    })

    return { text, gaps }
  }

  return {
    rawText,
    setRawText,
    gapCount,
    getContent,
  }
}

/**
 * Восстанавливает rawText из сохранённого FillGapsContent.
 * `{{gap-1}}` → `{{correctAnswer}}`
 */
export const restoreRawText = (
  text: string,
  gaps: { id: string; correctAnswer?: string }[],
): string => {
  const gapMap = new Map(gaps.map((g) => [g.id, g.correctAnswer ?? '']))
  return text.replace(/\{\{(gap-\d+)\}\}/g, (_match, gapId: string) => {
    return `{{${gapMap.get(gapId) ?? ''}}}`
  })
}
