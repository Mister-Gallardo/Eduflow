import { authRouter } from '../modules/auth/auth.router.js'
import { coursesRouter } from '../modules/courses/courses.router.js'
import { enrollmentRouter } from '../modules/enrollment/enrollment.router.js'
import { learningRouter } from '../modules/learning/learning.router.js'

import { router } from './trpc.js'

export const appRouter = router({
  auth: authRouter,
  courses: coursesRouter,
  enrollment: enrollmentRouter,
  learning: learningRouter,
})

export type AppRouter = typeof appRouter
