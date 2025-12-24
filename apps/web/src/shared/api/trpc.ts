import type { AppRouter } from '@api/trpc/router.js'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
