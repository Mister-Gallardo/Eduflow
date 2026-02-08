import type { AppRouter } from '@eduflow/api'
import { createTRPCReact } from '@trpc/react-query'
import type { inferRouterOutputs } from '@trpc/server'

export const trpc = createTRPCReact<AppRouter>()
export type ApiOutputs = inferRouterOutputs<AppRouter>
