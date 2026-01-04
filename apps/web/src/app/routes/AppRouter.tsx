import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { withHeaderRoutes, withoutHeaderRoutes } from './layouts'

const router = createBrowserRouter([withHeaderRoutes, ...withoutHeaderRoutes])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
