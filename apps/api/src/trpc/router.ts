import { registerTrpcRoute } from '../modules/auth/auth.router.js'

import { router } from './trpc.js'

export const appRouter = router({
  register: registerTrpcRoute,
})

export type AppRouter = typeof appRouter
