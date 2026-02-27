import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useMe } from '@/entities/user'
import { paths } from '@/shared/config/paths'
import { FullPageLoader } from '@/shared/ui/feedback/full-page-loader'

interface AuthGuardProps {
  children: ReactNode
  mode?: 'private' | 'guest-only'
}

export const AuthGuard = ({ children, mode = 'private' }: AuthGuardProps) => {
  const { userData, isUserLoading } = useMe()

  if (isUserLoading) {
    return <FullPageLoader />
  }

  if (mode === 'private') {
    if (!userData) {
      return <Navigate to={paths.auth()} replace />
    }
    return <>{children}</>
  }

  if (mode === 'guest-only') {
    if (userData) {
      return <Navigate to={paths.home()} replace />
    }
    return <>{children}</>
  }

  return <>{children}</>
}
