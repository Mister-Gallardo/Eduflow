import {
  zCheckStepInput,
  zCompleteStepInput,
  zEnrollCourseInput,
  zGetCourseNavigationInput,
  zGetStepDataInput,
} from '@eduflow/shared'

import { protectedProcedure, router } from '../../trpc/trpc.js'

import {
  checkStepService,
  completeStepService,
  enrollService,
  getCourseNavigationService,
  getStepDataService,
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

  checkStep: protectedProcedure
    .input(zCheckStepInput)
    .mutation(({ ctx, input }) => checkStepService(ctx, input)),

  completeStep: protectedProcedure
    .input(zCompleteStepInput)
    .mutation(({ ctx, input }) => completeStepService(ctx, input)),
})
