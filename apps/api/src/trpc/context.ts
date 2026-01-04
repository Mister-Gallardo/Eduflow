import { db } from '@eduflow/db'
import { logger } from '@eduflow/logger'
import type { Request, Response } from 'express'

import { verifyAccessToken } from '../lib/jwt.js'
import type { AuthCookies } from '../modules/auth/auth.cookies.types.js'

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
