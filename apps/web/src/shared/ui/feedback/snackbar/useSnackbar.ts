import { createContext, useContext } from 'react'

import type { SnackbarOptions } from './types'

interface SnackbarContextValue {
  showSnackbar: (options: SnackbarOptions) => void
}

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined)

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (!ctx) {
    throw new Error('useSnackbar must be used within SnackbarProvider')
  }
  return ctx.showSnackbar
}
