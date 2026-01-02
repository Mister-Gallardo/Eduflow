import { db } from '@eduflow/db'
import type { Request, Response } from 'express'

import { verifyAccessToken } from '../lib/jwt.js'
import type { AuthCookies } from '../modules/auth/auth.cookies.types.js'

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext(opts: { req: Request; res: Response }) {
  const { req, res } = opts
  const cookies = req.cookies as AuthCookies | undefined
  const token = cookies?.access

  if (!token) return { me: null, db, res }

  try {
    const payload = verifyAccessToken(token)

    return {
      me: { id: payload.sub, sessionId: payload.sessionId },
      db,
      res,
    }
  } catch {
    return { me: null, db, res }
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
