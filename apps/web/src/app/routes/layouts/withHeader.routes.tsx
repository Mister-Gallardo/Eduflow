import type { RouteObject } from 'react-router-dom'

import { HomePage } from '../../../pages/home'
import { routes } from '../path'

// import { AuthPage } from '../../../pages/auth'

export const withHeaderRoutes: RouteObject = {
  // element: <MainLayut />,
  children: [{ path: routes.home(), element: <HomePage /> }],
}
