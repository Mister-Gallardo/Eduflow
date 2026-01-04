import { zLoginInput, zRegisterInput } from '@eduflow/shared'

import { procedure, router } from '../../trpc/trpc.js'

import { loginService, logoutService, me, refreshService, registerService } from './auth.service.js'

export const authRouter = router({
  register: procedure.input(zRegisterInput).mutation(({ ctx, input }) => {
    return registerService(ctx, input)
  }),

  login: procedure.input(zLoginInput).mutation(({ ctx, input }) => {
    return loginService(ctx, input)
  }),

  refresh: procedure.mutation(({ ctx }) => {
    return refreshService(ctx)
  }),

  logout: procedure.mutation(({ ctx }) => {
    return logoutService(ctx)
  }),

  me: procedure.query(({ ctx }) => {
    return me(ctx)
  }),
})
