import type { Prisma, PrismaClient } from '@eduflow/db'
import type { LoginInput, RegisterInput, UserRole } from '@eduflow/shared'
import { TRPCError } from '@trpc/server'

import { ExpectedError } from '../../lib/error.js'
import type { Context } from '../../trpc/context.js'

import { clearAuthCookies, readRefreshCookie, setAuthCookies } from './lib/cookies.js'
import { signAccessToken } from './lib/jwt.js'
import { hashPassword, verifyPassword } from './lib/password.js'
import { generateRefreshToken, hashRefreshToken, verifyRefreshToken } from './lib/refresh.js'
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

    const refreshValue = `${session.id}.${refreshToken}`

    setAuthCookies(ctx.res, {
      access: accessToken,
      refresh: refreshValue,
    })

    return { userId: user.id }
  })
}

export async function loginService(ctx: Context, input: LoginInput): Promise<{ userId: string }> {
  const user = await ctx.db.user.findUnique({
    where: { email: input.email },
  })

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid credentials',
      cause: new ExpectedError('Invalid credentials'),
    })
  }

  const passwordOk = await verifyPassword(user.passwordHash, input.password)

  if (!passwordOk) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid credentials',
      cause: new ExpectedError('Invalid credentials'),
    })
  }

  const refreshToken = generateRefreshToken()
  const refreshHash = await hashRefreshToken(refreshToken)

  return await ctx.db.$transaction(async (tx) => {
    const session = await sessionRepository.create(tx as Prisma.TransactionClient, {
      userId: user.id,
      refreshHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })

    const accessToken = signAccessToken({
      sub: user.id,
      sessionId: session.id,
    })

    const refreshValue = `${session.id}.${refreshToken}`

    setAuthCookies(ctx.res, {
      access: accessToken,
      refresh: refreshValue,
    })

    return { userId: user.id }
  })
}

export async function refreshService(ctx: Context): Promise<{ ok: true }> {
  const raw = readRefreshCookie(ctx.req)

  if (!raw) {
    clearAuthCookies(ctx.res)
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  const [sessionId, token] = raw.split('.')
  if (!sessionId || !token) {
    clearAuthCookies(ctx.res)
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  const session = await ctx.db.session.findUnique({
    where: { id: sessionId },
  })

  if (
    !session ||
    session.revokedAt ||
    session.expiresAt < new Date() ||
    !(await verifyRefreshToken(session.refreshHash, token))
  ) {
    clearAuthCookies(ctx.res)
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  const newRefreshToken = generateRefreshToken()
  const newRefreshHash = await hashRefreshToken(newRefreshToken)

  return await ctx.db.$transaction(async (tx) => {
    await sessionRepository.revoke(tx as Prisma.TransactionClient, sessionId)

    const newSession = await sessionRepository.create(tx as Prisma.TransactionClient, {
      userId: session.userId,
      refreshHash: newRefreshHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })

    const accessToken = signAccessToken({
      sub: session.userId,
      sessionId: newSession.id,
    })

    const refreshValue = `${newSession.id}.${newRefreshToken}`

    setAuthCookies(ctx.res, {
      access: accessToken,
      refresh: refreshValue,
    })

    return { ok: true }
  })
}

export async function logoutService(ctx: Context): Promise<{ ok: true }> {
  const raw = readRefreshCookie(ctx.req)

  if (raw) {
    const [sessionId] = raw.split('.')
    if (sessionId) {
      await sessionRepository.revoke(ctx.db as PrismaClient, sessionId)
    }
  }

  clearAuthCookies(ctx.res)

  return { ok: true }
}

export async function getMeService(ctx: Context): Promise<{ id: string; role: UserRole } | null> {
  if (ctx.isTokenExpired) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Access token expired.' })
  }

  if (!ctx.me) {
    return null
  }

  const user = await ctx.db.user.findUnique({
    where: { id: ctx.me.id },
  })

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return {
    id: ctx.me.id,
    role: user.role,
  }
}
