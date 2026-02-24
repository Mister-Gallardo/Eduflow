import {
  zCheckStepInput,
  zCompleteStepInput,
  zGetCourseNavigationInput,
  zGetStepDataInput,
} from '@eduflow/shared'

import { protectedProcedure, router } from '../../trpc/trpc.js'

import {
  checkStepService,
  getCourseNavigationService,
  getStepDataService,
  submitStepService,
} from './learning.service.js'

export const learningRouter = router({
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
    .mutation(({ ctx, input }) => submitStepService(ctx, input)),
})
