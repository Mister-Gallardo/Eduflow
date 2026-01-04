import type { PrismaClient } from '@eduflow/db'
import { db } from '@eduflow/db'

import { sessionRepository } from '../modules/auth/session.repository.js'

const REVOKED_RETENTION_DAYS = 7

export async function cleanupSessionsJob() {
  const now = new Date()
  const revokedBefore = new Date(now.getTime() - REVOKED_RETENTION_DAYS * 24 * 60 * 60 * 1000)

  const [expired, revoked] = await Promise.all([
    sessionRepository.deleteExpired(db as PrismaClient, now),
    sessionRepository.deleteRevokedOlderThan(db as PrismaClient, revokedBefore),
  ])

  return {
    expiredDeleted: expired.count,
    revokedDeleted: revoked.count,
  }
}
