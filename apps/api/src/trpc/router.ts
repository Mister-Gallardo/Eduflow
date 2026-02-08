import { authRouter } from '../modules/auth/auth.router.js'
import { coursesRouter } from '../modules/courses/courses.router.js'
import { exampleTrpcRoute } from '../modules/example/index.js'

import { router } from './trpc.js'

export const appRouter = router({
  auth: authRouter,
  courses: coursesRouter,
  example: exampleTrpcRoute,
})

export type AppRouter = typeof appRouter
