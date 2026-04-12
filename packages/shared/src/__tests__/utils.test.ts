import { describe, expect, it } from 'vitest'

import { isFunction, omit, pick } from '../utils.js'

// ─── omit ───

describe('omit', () => {
  it('удаляет указанные ключи из объекта', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['b', 'c'])
    expect(result).toEqual({ a: 1 })
  })

  it('возвращает копию, не мутируя оригинал', () => {
    const obj = { a: 1, b: 2 }
    const result = omit(obj, ['a'])
    expect(result).toEqual({ b: 2 })
    expect(obj).toEqual({ a: 1, b: 2 })
  })

  it('возвращает полную копию при пустом массиве ключей', () => {
    const obj = { x: 10, y: 20 }
    const result = omit(obj, [])
    expect(result).toEqual({ x: 10, y: 20 })
  })
})

// ─── pick ───

describe('pick', () => {
  it('оставляет только указанные ключи', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pick(obj, ['a', 'c'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('возвращает пустой объект при пустом массиве ключей', () => {
    const obj = { a: 1, b: 2 }
    const result = pick(obj, [])
    expect(result).toEqual({})
  })

  it('игнорирует несуществующие ключи', () => {
    const obj = { a: 1 } as Record<string, unknown>
    const result = pick(obj, ['a', 'z'] as const)
    expect(result).toEqual({ a: 1 })
  })
})

// ─── isFunction ───

describe('isFunction', () => {
  it('возвращает true для функции', () => {
    expect(isFunction(() => {})).toBe(true)
  })

  it('возвращает true для именованной функции', () => {
    function named() {}
    expect(isFunction(named)).toBe(true)
  })

  it('возвращает false для строки', () => {
    expect(isFunction('hello')).toBe(false)
  })

  it('возвращает false для числа', () => {
    expect(isFunction(42)).toBe(false)
  })

  it('возвращает false для null', () => {
    expect(isFunction(null)).toBe(false)
  })

  it('возвращает false для объекта', () => {
    expect(isFunction({})).toBe(false)
  })
})
