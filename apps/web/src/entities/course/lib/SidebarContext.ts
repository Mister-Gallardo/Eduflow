import { createContext, useContext } from 'react'

interface SidebarActionContextValue {
  onClose?: () => void
}

export const SidebarActionContext = createContext<SidebarActionContextValue>({})

export const useSidebarAction = () => useContext(SidebarActionContext)
