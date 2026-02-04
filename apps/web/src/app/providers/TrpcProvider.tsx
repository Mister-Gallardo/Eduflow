import { env } from '@/shared/config/env'

import type { AppRouter } from '@eduflow/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink, type TRPCLink } from '@trpc/react-query'
import { observable } from '@trpc/server/observable'
import { useState } from 'react'
import superjson from 'superjson'

import { trpc } from '@/shared/api'

let refreshPromise: Promise<void> | null = null

async function refreshAccessToken() {
  refreshPromise ??= fetch(`${env.VITE_API_URL}/trpc/auth.refresh?batch=1`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      0: { json: null },
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Refresh failed')
      }
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

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
          // url: 'https://k62z1cqb-3000.euw.devtunnels.ms' + '/trpc',
          // ! ПОМЕНЯТЬ !
          url: env.VITE_API_URL + '/trpc',
          transformer: superjson,
          async fetch(url, options) {
            const res = await fetch(url, {
              ...options,
              credentials: 'include',
            })

            if (res.status !== 401) {
              return res
            }

            const urlStr = (() => {
              if (typeof url === 'string') return url
              if (url instanceof URL) return url.href
              if (url instanceof Request) return url.url
              return ''
            })()

            if (
              urlStr.includes('auth.login') ||
              urlStr.includes('auth.register') ||
              urlStr.includes('auth.refresh')
            ) {
              return res
            }

            try {
              await refreshAccessToken()
            } catch {
              queryClient.clear()
              window.location.href = '/auth'
              return res
            }

            return fetch(url, {
              ...options,
              credentials: 'include',
            })
          },
        }),
        // Для особых случаев, например, дуплексное соединение (useQuery(..., { refetchInterval: 1000 }) или WebSocker),
        // или когда какой-то запрос тяжелый (чтоб не задерживать все остальные в батче) и т.д.,
        // лучше использовать httpLink для таких отдельных запросов
        // httpLink({ url: '/trpc/realtime' }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
