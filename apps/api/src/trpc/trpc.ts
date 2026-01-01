import { logger } from '@eduflow/logger'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

import { ExpectedError } from '../lib/error.js' // Твой класс ошибок

import type { Context } from './context.js'

const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        isPublic: error.cause instanceof ExpectedError || error.code === 'BAD_REQUEST',
      },
    }
  },
})

export const procedure = trpc.procedure.use(async ({ path, type, next, ctx, getRawInput }) => {
  const start = Date.now()
  const result = await next()
  const durationMs = Date.now() - start
  const rawInput = await getRawInput()

  const meta = {
    path,
    userId: ctx.me?.id ?? 'anonymous',
    durationMs: `${durationMs}ms`,
    input: rawInput,
  }

  if (result.ok) {
    logger.info(`trpc:${type}:success`, 'Successfull request', { ...meta, output: result.data })
    return result
  }

  const isExpected =
    result.error.cause instanceof ExpectedError || result.error.code === 'BAD_REQUEST'

  if (isExpected) {
    logger.info(`trpc:${type}:expected-error`, result.error.message, meta)
  } else {
    logger.error(`trpc:${type}:error`, result.error.message, meta)
  }

  return result
})

export const router = trpc.router
