import { logger } from '@eduflow/logger'
import cron from 'node-cron'

import { cleanupSessionsJob } from './cleanupSessions.job.js'

export function startCronJobs() {
  //   cron.schedule('*/10 * * * * *', async () => {
  cron.schedule('0 3 * * *', async () => {
    try {
      logger.info('cron', 'cron:cleanup-sessions:start')

      const result = await cleanupSessionsJob()

      logger.info('cron', 'cron:cleanup-sessions:success', { result })
    } catch (error) {
      logger.error('cron', 'cron:cleanup-sessions:error', { error })
    }
  })
}
