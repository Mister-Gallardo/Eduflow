import z from 'zod'

export const zRegisterInput = z.object({
  fullName: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное'),
  email: z.email('Некорректный формат почты'),
  password: z
    .string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать цифру'),
})

export const zLoginInput = z.object({
  email: z.email('Некорректный формат почты'),
  password: z.string().min(1, 'Введите пароль'),
})

export const zUserRole = z.enum(['STUDENT', 'TEACHER']).default('STUDENT')

export type RegisterInput = z.infer<typeof zRegisterInput>
export type LoginInput = z.infer<typeof zLoginInput>
export type UserRole = z.infer<typeof zUserRole>
