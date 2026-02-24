import { TRPCError } from '@trpc/server'

import type { AuthorizedContext } from '../../trpc/context.js'

export const getStepOrThrow = async (ctx: AuthorizedContext, courseId: string, stepId: string) => {
  const step = await ctx.db.step.findUnique({
    where: {
      id: stepId,
      lesson: {
        module: {
          courseId,
        },
      },
    },
  })

  if (!step) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Step not found' })
  }

  return step
}
