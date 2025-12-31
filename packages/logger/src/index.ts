import { EOL } from 'node:os'

import { isFunction, omit } from '@eduflow/shared'
import debug from 'debug'
import pc from 'picocolors'
import { serializeError } from 'serialize-error'
import type { Logform } from 'winston'
import winston from 'winston'
import * as yaml from 'yaml'

const NODE_ENV = process.env.NODE_ENV ?? 'development'
const APP_NAMESPACE = process.env.APP_NAMESPACE ?? 'eduflow:api'

/* ------------------------------------------------------------------ */
/* redact sensitive fields                                            */
/* ------------------------------------------------------------------ */

const SENSITIVE_KEYS = new Set([
  'password',
  'newPassword',
  'oldPassword',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
  'signature',
  'apiKey',
])

const redactFormat = winston.format((info: Logform.TransformableInfo) => {
  const seen = new WeakSet<object>()

  const redact = (value: unknown): unknown => {
    if (!value || typeof value !== 'object') return value
    if (seen.has(value)) return value

    seen.add(value)

    // Обрабатываем массивы и объекты рекурсивно
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        value[i] = redact(value[i])
      }
      return value
    }

    const record = value as Record<string, unknown>

    for (const key of Object.keys(record)) {
      if (SENSITIVE_KEYS.has(key)) {
        record[key] = '[REDACTED]'
      } else {
        record[key] = redact(record[key])
      }
    }
    return value
  }

  redact(info)
  return info
})

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

type LogMeta = Record<string, unknown>

const safeCloneMeta = (meta?: LogMeta): LogMeta | undefined => {
  if (!meta) return meta
  try {
    return structuredClone(meta)
  } catch {
    return { ...meta }
  }
}

/* ------------------------------------------------------------------ */
/* dev formatter                                                      */
/* ------------------------------------------------------------------ */

const devFormatter = winston.format.printf((info) => {
  const level = info.level as 'info' | 'error' | 'debug'
  const timestamp = typeof info.timestamp === 'string' ? info.timestamp : ''
  const logType = typeof info.logType === 'string' ? info.logType : ''
  const message = String(info.message)

  const colorByLevel = {
    info: pc.blue,
    error: pc.red,
    debug: pc.cyan,
  } as const

  const header = `${
    colorByLevel[level]?.(`${level}${logType ? ` ${logType}` : ''}`) ?? level
  } ${pc.green(timestamp)}`

  // Используем NODE_ENV
  const meta = omit(info as Record<string, unknown>, [
    'level',
    'logType',
    'timestamp',
    'message',
    'service',
    'nodeEnv',
    'hostEnv',
  ])

  const metaBlock =
    Object.keys(meta).length > 0
      ? EOL + yaml.stringify(meta, (_k, v) => (isFunction(v) ? '[Function]' : v)).trim()
      : ''

  return `${EOL}${header}${EOL}${message}${metaBlock}${EOL}`
})

/* ------------------------------------------------------------------ */
/* winston logger                                                     */
/* ------------------------------------------------------------------ */

export const winstonLogger = winston.createLogger({
  // Уровень логирования зависит от NODE_ENV
  level: NODE_ENV === 'production' ? 'info' : 'debug',
  defaultMeta: {
    service: 'backend',
    nodeEnv: NODE_ENV,
  },
  format: winston.format.combine(
    redactFormat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
  ),
  transports: [
    new winston.transports.Console({
      format: NODE_ENV === 'development' ? devFormatter : winston.format.json(),
    }),
  ],
})

/* ------------------------------------------------------------------ */
/* public logger API                                                  */
/* ------------------------------------------------------------------ */

export const logger = {
  info(logType: string, message: string, meta?: LogMeta) {
    if (!debug.enabled(`${APP_NAMESPACE}:${logType}`)) return
    const clonedMeta = safeCloneMeta(meta)
    winstonLogger.info(message, { logType, ...clonedMeta })
  },

  debug(logType: string, message: string, meta?: LogMeta) {
    if (!debug.enabled(`${APP_NAMESPACE}:${logType}`)) return
    const clonedMeta = safeCloneMeta(meta)
    winstonLogger.debug(message, { logType, ...clonedMeta })
  },

  error(logType: string, error: unknown, meta?: LogMeta) {
    if (!debug.enabled(`${APP_NAMESPACE}:${logType}`)) return

    const clonedMeta = safeCloneMeta(meta)

    if (typeof error === 'string') {
      winstonLogger.error(error, { logType, ...clonedMeta })
      return
    }

    const serialized = serializeError(error)

    const message =
      typeof serialized === 'object' &&
      serialized !== null &&
      typeof (serialized as { message?: unknown }).message === 'string'
        ? (serialized as { message: string }).message
        : 'Unknown error'

    const errorStack =
      typeof serialized === 'object' &&
      serialized !== null &&
      typeof (serialized as { stack?: unknown }).stack === 'string'
        ? (serialized as { stack?: string }).stack
        : undefined

    winstonLogger.error(message, {
      logType,
      errorStack: errorStack,
      ...clonedMeta,
    })
  },
}
