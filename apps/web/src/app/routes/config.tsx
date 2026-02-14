import { createBrowserRouter } from 'react-router-dom'

import { AuthPage } from '@/pages/auth'
import { HomePage } from '@/pages/home'
import { LearnPage } from '@/pages/learn'
import { paths } from '@/shared/config'
import { Result404 } from '@/shared/ui'

import { AppLayout, AuthLayout, LearnLayout } from '../layouts'

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
      },

      {
        path: '*',
        element: <Result404 />,
      },
    ],
  },
  {
    element: <LearnLayout />,
    children: [
      {
        path: paths.learn.root(),
        element: <LearnPage />,
        // handle: { header: { title: 'Обучение' } },
      },
    ],
  },
])
