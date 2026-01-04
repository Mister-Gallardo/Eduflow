import { env } from './lib/env.js'

import { db } from '@eduflow/db'
import { logger } from '@eduflow/logger'

import { startCronJobs } from './cron/index.js'
import { createApp } from './app.js'

const startServer = async () => {
  try {
    await db.$queryRawUnsafe('SELECT 1')

    const app = createApp()

    startCronJobs()

    const PORT = env.PORT

    app.listen(PORT, () => {
      logger.info('express', `API running on http://localhost:${PORT}`)
    })
  } catch (error) {
    const err = error as { code?: string; message?: string }

    if (err.code === 'ECONNREFUSED' || err.message?.includes("Can't reach database server")) {
      logger.error(
        'app',
        'Не удалось подключиться к базе данных: Postgres не запущен или недоступен',
      )
    } else {
      logger.error('app', 'Failed to start server', {
        error,
      })
    }

    process.exit(1)
  }
}

void startServer()

export type { AppRouter } from './trpc/router.js'
