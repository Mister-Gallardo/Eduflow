import type { Prisma } from '@eduflow/db'
import type { RegisterInput } from '@eduflow/shared'
import { TRPCError } from '@trpc/server'

import { ExpectedError } from '../../lib/error.js'
import { signAccessToken } from '../../lib/jwt.js'
import { hashPassword } from '../../lib/password.js'
import { generateRefreshToken, hashRefreshToken } from '../../lib/refresh.js'
import type { Context } from '../../trpc/context.js'

import { setAuthCookies } from './auth.cookies.js'
import { sessionRepository } from './session.repository.js'
export async function registerService(
  ctx: Context,
  input: RegisterInput,
): Promise<{ userId: string }> {
  const existing = await ctx.db.user.findUnique({
    where: { email: input.email },
  })

  if (existing) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Email already in use',
      cause: new ExpectedError('Email already in use'),
    })
  }

  const passwordHash = await hashPassword(input.password)
  const refreshToken = generateRefreshToken()
  const refreshHash = await hashRefreshToken(refreshToken)

  return await ctx.db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: input.email,
        fullName: input.fullName,
        passwordHash,
      },
    })

    const session = await sessionRepository.create(tx as Prisma.TransactionClient, {
      userId: user.id,
      refreshHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })

    const accessToken = signAccessToken({
      sub: user.id,
      sessionId: session.id,
    })

    setAuthCookies(ctx.res, {
      access: accessToken,
      refresh: refreshToken,
    })

    return { userId: user.id }
  })
}
