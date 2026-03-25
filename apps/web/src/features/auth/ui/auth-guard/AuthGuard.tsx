import type { UserRole } from '@eduflow/shared'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useGetMe } from '@/entities/user'
import { paths } from '@/shared/config/paths'
import { FullPageLoader } from '@/shared/ui/feedback/full-page-loader'

interface AuthGuardProps {
  children: ReactNode
  mode?: 'private' | 'guest-only'
  roles?: UserRole
}

export const AuthGuard = ({ children, mode = 'private', roles }: AuthGuardProps) => {
  const { user, isUserLoading } = useGetMe()

  if (isUserLoading) {
    return <FullPageLoader />
  }

  if (mode === 'guest-only') {
    return user ? <Navigate to={paths.home()} replace /> : <>{children}</>
  }

  if (!user) {
    return <Navigate to={paths.auth()} replace />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={paths.home()} replace />
  }

  return <>{children}</>
}
