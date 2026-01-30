import { z } from 'zod'

const zEnv = z.object({
  MODE: z.enum(['development', 'production']),
  PORT: z.coerce.number().int().positive().default(8000),
  VITE_API_URL: z.string().trim().min(1),
})

// eslint-disable-next-line no-restricted-syntax
const parsed = zEnv.safeParse(import.meta.env)

if (!parsed.success) {
  const errors = z.treeifyError(parsed.error)
  throw new Error(`❌ Ошибка в переменных окружения: ${JSON.stringify(errors, null, 2)}`)
}

export const env = parsed.data
