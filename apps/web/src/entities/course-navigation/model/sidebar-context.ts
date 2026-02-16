import { createContext, useContext } from 'react'

interface SidebarContextValue {
  onClose?: () => void
  activeModuleId?: string | null
  activeLessonId?: string | null
}

export const SidebarContext = createContext<SidebarContextValue>({})

export const useSidebarContext = () => useContext(SidebarContext)
