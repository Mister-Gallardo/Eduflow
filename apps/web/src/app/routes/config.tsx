import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { paths } from '@/shared/config'
import { GlobalLoader } from '@/shared/ui'

import { AppLayout, AuthLayout, LearnLayout, RootLayout } from '../layouts'

export const routeConfig = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <GlobalLoader />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: paths.auth(),
            lazy: async () => {
              const { AuthPage } = await import('@/pages/auth')
              return { Component: AuthPage }
            },
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
            element: <NotFoundPage />,
          },
        ],
      },
      {
        element: <LearnLayout />,
        children: [
          {
            path: paths.learn.root(),
            lazy: async () => {
              const { LearnPage } = await import('@/pages/learn')
              return { Component: LearnPage }
            },
            // handle: { header: { title: 'Обучение' } },
          },
        ],
      },
    ],
  },
])
