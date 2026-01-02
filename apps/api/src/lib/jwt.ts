import { env } from './env.js'

import jwt from 'jsonwebtoken'

const ACCESS_TTL = '15m'

export function signAccessToken(payload: { sub: string; sessionId: string }) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: ACCESS_TTL,
  })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as {
    sub: string
    sessionId: string
    exp: number
  }
}
