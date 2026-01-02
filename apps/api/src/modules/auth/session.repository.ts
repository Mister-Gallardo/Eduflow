import type { Prisma, PrismaClient } from '@eduflow/db'

export const sessionRepository = {
  create(
    prisma: Prisma.TransactionClient,
    data: {
      userId: string
      refreshHash: string
      expiresAt: Date
    },
  ) {
    return prisma.session.create({ data })
  },

  findValidByUser(prisma: PrismaClient, userId: string) {
    return prisma.session.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    })
  },

  revoke(prisma: PrismaClient, sessionId: string) {
    return prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    })
  },

  revokeAllForUser(prisma: PrismaClient, userId: string) {
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
}
