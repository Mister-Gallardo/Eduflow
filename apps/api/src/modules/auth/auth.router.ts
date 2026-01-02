import { zRegisterInput } from '@eduflow/shared'

import { procedure } from '../../trpc/trpc.js'

import { registerService } from './auth.service.js'

export const registerTrpcRoute = procedure.input(zRegisterInput).mutation(({ ctx, input }) => {
  return registerService(ctx, input)
})
