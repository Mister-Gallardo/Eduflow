import type { Prisma, PrismaClient } from '@eduflow/db'

type PrismaExecutor = PrismaClient | Prisma.TransactionClient

export const sessionRepository = {
  create(
    prisma: PrismaExecutor,
    data: {
      userId: string
      refreshHash: string
      expiresAt: Date
    },
  ) {
    return prisma.session.create({ data })
  },

  findValidByUser(prisma: PrismaExecutor, userId: string) {
    return prisma.session.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    })
  },

  revoke(prisma: PrismaExecutor, sessionId: string) {
    return prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    })
  },

  revokeAllForUser(prisma: PrismaExecutor, userId: string) {
    return prisma.session.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    })
  },

  deleteExpired(prisma: PrismaExecutor, now: Date) {
    return prisma.session.deleteMany({
      where: {
        expiresAt: { lt: now },
      },
    })
  },

  deleteRevokedOlderThan(prisma: PrismaExecutor, date: Date) {
    return prisma.session.deleteMany({
      where: {
        revokedAt: { not: null, lt: date },
      },
    })
  },
}
