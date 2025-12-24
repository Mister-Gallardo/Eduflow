import { exampleTrpcRoute } from '../modules/example/index.js'

import { router } from './trpc.js'

export const appRouter = router({
  example: exampleTrpcRoute,
})

export type AppRouter = typeof appRouter
