import path from 'node:path'

import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '../../.env'), override: false })

const zEnv = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.string().min(1).max(2048),
  JWT_SECRET: z.string().min(32),
})

// eslint-disable-next-line n/no-process-env
const parsed = zEnv.safeParse(process.env)

if (!parsed.success) {
  const errors = z.treeifyError(parsed.error)

  console.error('❌ Ошибка в переменных окружения:', JSON.stringify(errors, null, 2))
  process.exit(1)
}
export const env = parsed.data
