import { createExpressMiddleware } from '@trpc/server/adapters/express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import { createContext } from './trpc/context.js'
import { appRouter } from './trpc/router.js'

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  )

  app.use(cookieParser())

  app.use(express.json())

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: createContext,
    }),
  )

  return app
}
