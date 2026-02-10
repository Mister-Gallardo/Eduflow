import { authRouter } from '../modules/auth/auth.router.js'
import { coursesRouter } from '../modules/courses/courses.router.js'
import { exampleTrpcRoute } from '../modules/example/index.js'
import { learningRouter } from '../modules/learning/learning.router.js'

import { router } from './trpc.js'

export const appRouter = router({
  auth: authRouter,
  courses: coursesRouter,
  learning: learningRouter,
  example: exampleTrpcRoute,
})

export type AppRouter = typeof appRouter
