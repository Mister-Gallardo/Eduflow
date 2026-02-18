import {
  zEnrollCourseInput,
  zGetCourseNavigationInput,
  zGetStepDataInput,
  zInitCourseSessionInput,
} from '@eduflow/shared'

import { protectedProcedure, router } from '../../trpc/trpc.js'

import {
  enrollService,
  getCourseNavigationService,
  getStepDataService,
  initCourseSessionService,
} from './learning.service.js'

export const learningRouter = router({
  enroll: protectedProcedure
    .input(zEnrollCourseInput)
    .mutation(({ ctx, input }) => enrollService(ctx, input)),

  getCourseNavigation: protectedProcedure
    .input(zGetCourseNavigationInput)
    .query(({ ctx, input }) => getCourseNavigationService(ctx, input)),

  getStepData: protectedProcedure
    .input(zGetStepDataInput)
    .query(({ ctx, input }) => getStepDataService(ctx, input)),

  initCourseSession: protectedProcedure
    .input(zInitCourseSessionInput)
    .mutation(({ ctx, input }) => initCourseSessionService(ctx, input)),

  // checkStep: protectedProcedure
  //   .input(zCheckStepInput)
  //   .mutation(({ ctx, input }) => checkStepService(ctx, input)),
})
