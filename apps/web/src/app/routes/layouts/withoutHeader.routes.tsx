import type { RouteObject } from 'react-router-dom'

import { AuthPage } from '../../../pages/auth'
import { routes } from '../path'

export const withoutHeaderRoutes: RouteObject[] = [{ path: routes.auth(), element: <AuthPage /> }]
