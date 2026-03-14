import { zGetRepliesServiceInput, zReviewReplyInput } from '@eduflow/shared'

import { protectedProcedure, router } from '../../trpc/trpc.js'

import {
  getPendingRepliesService,
  getReviewedRepliesService,
  getTeachCoursesService,
  getTeachStatsService,
  reviewReplyService,
} from './teach.service.js'

export const teachRouter = router({
  getStats: protectedProcedure.query(({ ctx }) => getTeachStatsService(ctx)),

  getCourses: protectedProcedure.query(({ ctx }) => getTeachCoursesService(ctx)),

  getPendingReplies: protectedProcedure
    .input(zGetRepliesServiceInput)
    .query(({ ctx, input }) => getPendingRepliesService(ctx, input)),

  getReviewedReplies: protectedProcedure
    .input(zGetRepliesServiceInput)
    .query(({ ctx, input }) => getReviewedRepliesService(ctx, input)),

  reviewReply: protectedProcedure
    .input(zReviewReplyInput)
    .mutation(({ ctx, input }) => reviewReplyService(ctx, input)),
})
