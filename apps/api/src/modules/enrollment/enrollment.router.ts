import { zEnrollCourseInput, zGetCoursesInput } from '@eduflow/shared'

import { protectedProcedure, router } from '../../trpc/trpc.js'

import { enrollService, getEnrolledCoursesService } from './enrollment.service.js'

export const enrollmentRouter = router({
  enroll: protectedProcedure
    .input(zEnrollCourseInput)
    .mutation(({ ctx, input }) => enrollService(ctx, input)),

  getEnrolledCourses: protectedProcedure
    .input(zGetCoursesInput)
    .query(({ ctx, input }) => getEnrolledCoursesService(ctx, input)),

  // checkEnrollment: protectedProcedure
  //   .input(zCheckEnrollmentInput)
  //   .query(({ ctx, input }) => checkEnrollmentService(ctx, input)),
})
