import { zRegisterInput } from '@eduflow/shared'
import { z } from 'zod'

export const registerFormSchema = zRegisterInput
  .extend({
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
    terms: z.boolean().refine((val) => val === true, {
      message: 'Нам нужно ваше согласие, чтобы создать аккаунт',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
