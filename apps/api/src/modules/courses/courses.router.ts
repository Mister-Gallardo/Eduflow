import { zGetCoursesInput } from '@eduflow/shared'

import { publicProcedure, router } from '../../trpc/trpc.js'

import { getCoursesService } from './courses.service.js'

export const coursesRouter = router({
  getCourses: publicProcedure.input(zGetCoursesInput).query(({ ctx, input }) => {
    return getCoursesService(ctx, input)
  }),
})
