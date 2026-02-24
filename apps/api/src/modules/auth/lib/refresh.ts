import crypto from 'node:crypto'

import argon2 from 'argon2'

import { ARGON2_OPTIONS } from './argon2.js'

export function generateRefreshToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function hashRefreshToken(token: string): Promise<string> {
  return await argon2.hash(token, ARGON2_OPTIONS)
}

export async function verifyRefreshToken(hash: string, token: string): Promise<boolean> {
  return await argon2.verify(hash, token)
}
