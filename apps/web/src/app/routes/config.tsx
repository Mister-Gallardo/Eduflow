import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '@/pages/home'
import { paths } from '@/shared/config/paths'
import { GlobalLoader } from '@/shared/ui/feedback/global-loader'

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
            lazy: async () => {
              const { NotFoundPage } = await import('@/pages/not-found')
              return { Component: NotFoundPage }
            },
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
