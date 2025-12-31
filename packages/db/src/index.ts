import { logger } from '@eduflow/logger'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

import { PrismaClient } from '../generated/prisma/client.js'

// 1. Инициализируем Pool (рекомендуемый способ для Prisma + pg)
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

// 2. Singleton для предотвращения исчерпания лимита соединений в dev-режиме
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

function createPrismaClient() {
  const prisma = new PrismaClient({
    adapter,
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'info' },
    ],
  })

  // 3. Низкоуровневые логи (события)
  prisma.$on('query', (e) => {
    logger.info('prisma:low:query', 'Successful request', {
      query: e.query,
      duration: e.duration,
      // В монорепозитории используем process.env напрямую
      params: process.env.NODE_ENV === 'development' ? e.params : '***',
    })
  })

  prisma.$on('info', (e) => {
    logger.info('prisma:low:info', e.message)
  })

  // 4. Высокоуровневые логи через Extensions (ваша логика)
  return prisma.$extends({
    query: {
      $allModels: {
        $allOperations: async ({ model, operation, args, query }) => {
          const start = Date.now()
          try {
            const result = await query(args)
            const durationMs = Date.now() - start
            logger.info('prisma:high', 'Successful request', {
              model,
              operation,
              args,
              durationMs,
            })
            return result
          } catch (error) {
            const durationMs = Date.now() - start
            logger.error('prisma:high', error, { model, operation, args, durationMs })
            throw error
          }
        },
      },
    },
  })
}

// Экспортируем db (название prisma часто конфликтует с импортом типа из библиотеки)
export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export * from '../generated/prisma/client.js'
