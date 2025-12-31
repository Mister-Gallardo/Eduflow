import { env } from '../../shared/config/env'

import type { AppRouter } from '@eduflow/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink, type TRPCLink } from '@trpc/react-query'
import { observable } from '@trpc/server/observable'
import { useState } from 'react'
import superjson from 'superjson'

import { trpc } from '../../shared/api/trpc'

const customErrorLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      return next(op).subscribe({
        next: (value) => observer.next(value),
        error: (error) => {
          // Ваша логика с Sentry
          // sentryCaptureException(error)
          console.error('tRPC Error:', error)
          observer.error(error)
        },
        complete: () => observer.complete(),
      })
    })
  }
}

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        customErrorLink,
        loggerLink({
          enabled: () => env.MODE === 'development',
        }),
        httpBatchLink({
          url: env.VITE_API_URL + '/trpc',
          transformer: superjson,
          // headers: () => {
          //   const token = Cookies.get('token')
          //   return {
          //     ...(token && { authorization: `Bearer ${token}` }),
          //   }
          // },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
