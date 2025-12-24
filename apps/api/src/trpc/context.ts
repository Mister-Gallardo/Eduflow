import type { Request, Response } from 'express'

// import { prisma } from '../lib/prisma'

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext(opts: { req: Request; res: Response }) {
  const { req, res } = opts

  // позже здесь будет JWT
  const me = null

  return {
    req,
    res,
    // prisma,
    me,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
