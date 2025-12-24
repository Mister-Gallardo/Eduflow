import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

import type { Context } from './context.js'

export const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = trpc.router
export const procedure = trpc.procedure
