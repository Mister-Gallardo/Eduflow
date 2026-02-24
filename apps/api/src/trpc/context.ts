import { db } from '@eduflow/db'
import { logger } from '@eduflow/logger'
import type { Request, Response } from 'express'

import type { AuthCookies } from '../modules/auth/auth.types.js'
import { verifyAccessToken } from '../modules/auth/lib/jwt.js'

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext(opts: { req: Request; res: Response }) {
  const { req, res } = opts
  const cookies = req.cookies as AuthCookies | undefined
  const token = cookies?.access

  let me: { id: string; sessionId: string } | null = null

  if (token) {
    try {
      const payload = verifyAccessToken(token)
      me = { id: payload.sub, sessionId: payload.sessionId }
    } catch {
      logger.info('Invalid access token provided in cookies', 'CTX')
    }
  }

  return { me, db, req, res }
}

export type Context = Awaited<ReturnType<typeof createContext>>
export type AuthorizedContext = Context & { me: NonNullable<Context['me']> }
