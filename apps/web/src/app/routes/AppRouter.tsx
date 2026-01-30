import { RouterProvider } from 'react-router-dom'

import { routeConfig } from './config'

export const AppRouter = () => {
  return <RouterProvider router={routeConfig} />
}
