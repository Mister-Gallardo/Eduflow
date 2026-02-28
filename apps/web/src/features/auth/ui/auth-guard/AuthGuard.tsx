import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useGetMe } from '@/entities/user'
import { paths } from '@/shared/config/paths'
import { FullPageLoader } from '@/shared/ui/feedback/full-page-loader'

interface AuthGuardProps {
  children: ReactNode
  mode?: 'private' | 'guest-only'
}

export const AuthGuard = ({ children, mode = 'private' }: AuthGuardProps) => {
  const { user, isUserLoading } = useGetMe()

  if (isUserLoading) {
    return <FullPageLoader />
  }

  if (mode === 'private') {
    if (!user) {
      return <Navigate to={paths.auth()} replace />
    }
    return <>{children}</>
  }

  if (mode === 'guest-only') {
    if (user) {
      return <Navigate to={paths.home()} replace />
    }
    return <>{children}</>
  }

  return <>{children}</>
}
