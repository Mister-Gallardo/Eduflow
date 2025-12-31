import { env } from './lib/env.js'

import { logger } from '@eduflow/logger'

import { createApp } from './app.js'

const app = createApp()

const PORT = env.PORT

app.listen(PORT, () => {
  logger.info('express', `API running on http://localhost:${PORT}`)
})

export type { AppRouter } from './trpc/router.js'
