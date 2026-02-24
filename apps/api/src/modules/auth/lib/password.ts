import argon2 from 'argon2'

import { ARGON2_OPTIONS } from './argon2.js'

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password, ARGON2_OPTIONS)
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return await argon2.verify(hash, password)
}
