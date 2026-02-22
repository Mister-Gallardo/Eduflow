import { useState } from 'react'

export interface UseTextStepFormReturn {
  html: string
  setHtml: (value: string) => void
  getContent: () => { html: string }
}

/**
 * Хук управления формой TextStep для преподавателя.
 * Возвращает готовый content-объект через getContent().
 */
export const useTextStepForm = (initialHtml = ''): UseTextStepFormReturn => {
  const [html, setHtml] = useState(initialHtml)

  const getContent = () => ({ html })

  return { html, setHtml, getContent }
}
