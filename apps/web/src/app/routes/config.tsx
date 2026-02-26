import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '@/pages/home'
import { paths } from '@/shared/config/paths'
import { GlobalLoader } from '@/shared/ui/feedback/global-loader'

import { AppLayout, AuthLayout, CourseLayout, RootLayout } from '../layouts'

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
            path: paths.learn(),
            lazy: async () => {
              const { LearnPage } = await import('@/pages/learn')
              return { Component: LearnPage }
            },
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
        element: <CourseLayout />,
        children: [
          {
            path: paths.course.path(),
            lazy: async () => {
              const { CoursePage } = await import('@/pages/course')
              return { Component: CoursePage }
            },
            // handle: { header: { title: 'Обучение' } },
          },
        ],
      },
    ],
  },
])
