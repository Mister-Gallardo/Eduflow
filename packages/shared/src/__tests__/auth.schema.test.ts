import { describe, expect, it } from 'vitest'

import { zLoginInput, zRegisterInput } from '../auth.schema.js'

// ─── Регистрация ───

describe('zRegisterInput', () => {
  const validData = {
    fullName: 'Иван Иванов',
    email: 'ivan@example.com',
    password: 'SecurePass1',
  }

  it('пропускает корректные данные', () => {
    const result = zRegisterInput.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('отклоняет слишком короткое имя', () => {
    const result = zRegisterInput.safeParse({ ...validData, fullName: 'А' })
    expect(result.success).toBe(false)
  })

  it('отклоняет слишком длинное имя (>50 символов)', () => {
    const result = zRegisterInput.safeParse({ ...validData, fullName: 'А'.repeat(51) })
    expect(result.success).toBe(false)
  })

  it('отклоняет некорректный email', () => {
    const result = zRegisterInput.safeParse({ ...validData, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('отклоняет пароль без заглавной буквы', () => {
    const result = zRegisterInput.safeParse({ ...validData, password: 'securepass1' })
    expect(result.success).toBe(false)
  })

  it('отклоняет пароль без цифры', () => {
    const result = zRegisterInput.safeParse({ ...validData, password: 'SecurePass' })
    expect(result.success).toBe(false)
  })

  it('отклоняет пароль короче 8 символов', () => {
    const result = zRegisterInput.safeParse({ ...validData, password: 'Se1' })
    expect(result.success).toBe(false)
  })
})

// ─── Логин ───

describe('zLoginInput', () => {
  it('пропускает корректные данные', () => {
    const result = zLoginInput.safeParse({
      email: 'user@example.com',
      password: 'any-password',
    })
    expect(result.success).toBe(true)
  })

  it('отклоняет некорректный email', () => {
    const result = zLoginInput.safeParse({
      email: 'bad-email',
      password: 'password',
    })
    expect(result.success).toBe(false)
  })

  it('отклоняет пустой пароль', () => {
    const result = zLoginInput.safeParse({
      email: 'user@example.com',
      password: '',
    })
    expect(result.success).toBe(false)
  })
})
