import { zGetCoursesInput, zUpdateCourseInput } from '@eduflow/shared'

import { protectedProcedure, publicProcedure, router } from '../../trpc/trpc.js'

import { getCoursesService, updateCourseService } from './courses.service.js'

export const coursesRouter = router({
  getCourses: publicProcedure
    .input(zGetCoursesInput)
    .query(({ ctx, input }) => getCoursesService(ctx, input)),

  update: protectedProcedure
    .input(zUpdateCourseInput)
    .mutation(({ ctx, input }) => updateCourseService(ctx, input)),
})
