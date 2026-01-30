import { createBrowserRouter } from 'react-router-dom'

import AuthPage from '../../pages/auth'
import { HomePage } from '../../pages/home'
import { paths } from '../../shared/config'
import { AppLayout, AuthLayout } from '../layouts'

export const routeConfig = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: paths.auth(),
        element: <AuthPage />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: paths.home(),
        element: <HomePage />,
        handle: { header: { title: 'Главная' } },
      },
    ],
  },
])
