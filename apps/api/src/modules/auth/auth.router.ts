import { zLoginInput, zRegisterInput } from '@eduflow/shared'

import { publicProcedure, router } from '../../trpc/trpc.js'

import {
  getMeService,
  loginService,
  logoutService,
  refreshService,
  registerService,
} from './auth.service.js'

export const authRouter = router({
  register: publicProcedure.input(zRegisterInput).mutation(({ ctx, input }) => {
    return registerService(ctx, input)
  }),

  login: publicProcedure.input(zLoginInput).mutation(({ ctx, input }) => {
    return loginService(ctx, input)
  }),

  refresh: publicProcedure.mutation(({ ctx }) => {
    return refreshService(ctx)
  }),

  logout: publicProcedure.mutation(({ ctx }) => {
    return logoutService(ctx)
  }),

  getMe: publicProcedure.query(({ ctx }) => {
    return getMeService(ctx)
  }),
})
