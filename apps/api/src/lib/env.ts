import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const zEnv = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
})

// eslint-disable-next-line n/no-process-env
const parsed = zEnv.safeParse(process.env)

if (!parsed.success) {
  const errors = z.treeifyError(parsed.error)

  console.error('❌ Ошибка в переменных окружения:', JSON.stringify(errors, null, 2))
  process.exit(1)
}
export const env = parsed.data
