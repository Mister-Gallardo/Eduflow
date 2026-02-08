import { env } from '../../lib/env.js'

import type { Request, Response } from 'express'

import type { AuthCookies } from './auth.types.js'

const ACCESS_MAX_AGE = 15 * 60 * 1000
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60 * 1000

export function setAuthCookies(res: Response, tokens: { access: string; refresh: string }) {
  res.cookie('access', tokens.access, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    maxAge: ACCESS_MAX_AGE,
    path: '/',
  })

  res.cookie('refresh', tokens.refresh, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    maxAge: REFRESH_MAX_AGE,
    path: '/',
  })
}

export function readRefreshCookie(req: Request): string | null {
  const cookies = req.cookies as AuthCookies | undefined
  return cookies?.refresh ?? null
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('access')
  res.clearCookie('refresh')
}
