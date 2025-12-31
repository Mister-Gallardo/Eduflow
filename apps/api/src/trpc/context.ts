import { db } from '@eduflow/db'
import type { Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext(opts: { req: Request; res: Response }) {
  const { req, res } = opts

  // позже здесь будет JWT
  const me = null

  return {
    req,
    res,
    db,
    me,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
