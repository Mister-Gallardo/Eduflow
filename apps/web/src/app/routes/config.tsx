import { createBrowserRouter } from 'react-router-dom'

import { AuthGuard } from '@/features/auth'
import { HomePage } from '@/pages/home'
import { paths } from '@/shared/config/paths'
import { GlobalLoader } from '@/shared/ui/feedback/global-loader'

import { AppLayout, AuthLayout, CourseEditLayout, CourseSolveLayout, RootLayout } from '../layouts'

export const routeConfig = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <GlobalLoader />,
    children: [
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
        element: (
          <AuthGuard mode="guest-only">
            <AuthLayout />
          </AuthGuard>
        ),
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
        element: (
          <AuthGuard mode="private">
            <AppLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: paths.learn(),
            handle: { authRequired: true },
            lazy: async () => {
              const { LearnPage } = await import('@/pages/learn')
              return { Component: LearnPage }
            },
          },
        ],
      },
      {
        element: (
          <AuthGuard mode="private" roles="TEACHER">
            <AppLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: paths.teach(),
            handle: { authRequired: true },
            lazy: async () => {
              const { TeachPage } = await import('@/pages/teach')
              return { Component: TeachPage }
            },
          },
        ],
      },
      {
        element: (
          <AuthGuard mode="private">
            <CourseSolveLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: paths.course.path(),
            lazy: async () => {
              const { CourseSolvePage } = await import('@/pages/course-solve')
              return { Component: CourseSolvePage }
            },
          },
        ],
      },
      {
        element: (
          <AuthGuard mode="private" roles="TEACHER">
            <CourseEditLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: paths.course.editPath(),
            lazy: async () => {
              const { CourseEditPage } = await import('@/pages/course-edit')
              return { Component: CourseEditPage }
            },
          },
        ],
      },
    ],
  },
])
