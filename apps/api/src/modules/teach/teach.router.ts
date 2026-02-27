import { zGetPendingSubmissionsInput } from '@eduflow/shared'

import { protectedProcedure, router } from '../../trpc/trpc.js'

import {
  getPendingSubmissionsService,
  getTeachCoursesService,
  getTeachStatsService,
} from './teach.service.js'

export const teachRouter = router({
  getStats: protectedProcedure.query(({ ctx }) => getTeachStatsService(ctx)),

  getCourses: protectedProcedure.query(({ ctx }) => getTeachCoursesService(ctx)),

  getPendingSubmissions: protectedProcedure
    .input(zGetPendingSubmissionsInput)
    .query(({ ctx, input }) => getPendingSubmissionsService(ctx, input)),
})
