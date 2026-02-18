import { createContext, use } from 'react'

import type { NavigationModule } from '../model'

interface SidebarContextValue {
  activeModuleId: string | null
  activeLessonId: string | null
  navigation: NavigationModule[]
  courseId: string
  courseTitle: string
  open: boolean
  onClose: () => void
  isLoading: boolean
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

export const useSidebarContext = () => {
  const ctx = use(SidebarContext)

  if (!ctx) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }

  return ctx
}
