import type { StepAnswer, StepType } from '@eduflow/shared'

import { shuffleArray } from '../../../lib/utils.js'

export const stripAnswers = (
  content: Record<string, unknown>,
  type: StepType,
): Record<string, unknown> => {
  const safe = structuredClone(content)

  switch (type) {
    case 'TEXT':
    case 'VIDEO':
    case 'FREE_TEXT':
      return safe

    case 'TEST_SINGLE': {
      const options = safe.options as Record<string, unknown>[] | undefined
      if (options) {
        for (const opt of options) {
          delete opt.isCorrect
        }
      }
      delete safe.correctOptionId
      return safe
    }

    case 'TEST_MULTIPLE': {
      const options = safe.options as Record<string, unknown>[] | undefined
      if (options) {
        for (const opt of options) {
          delete opt.isCorrect
        }
      }
      delete safe.correctOptionIds
      return safe
    }

    case 'MATCHING': {
      const right = safe.right as Record<string, unknown>[] | undefined
      if (right) {
        safe.right = shuffleArray(right)
      }
      delete safe.pairs
      return safe
    }

    case 'ORDERING': {
      const items = safe.items as Record<string, unknown>[] | undefined
      if (items) {
        safe.items = shuffleArray(items)
      }
      delete safe.correctOrder
      return safe
    }

    case 'INPUT_TEXT': {
      delete safe.correctAnswers
      return safe
    }

    case 'INPUT_NUMBER': {
      delete safe.correctAnswer
      return safe
    }

    case 'FILL_GAPS': {
      const gaps = safe.gaps as Record<string, unknown>[] | undefined
      if (gaps) {
        for (const gap of gaps) {
          delete gap.correctAnswer
        }
      }
      return safe
    }

    default:
      return safe
  }
}

export const validateAnswer = (
  content: Record<string, unknown>,
  type: StepType,
  userAnswer: StepAnswer,
): { isCorrect: boolean } => {
  switch (type) {
    case 'TEST_SINGLE': {
      const options = content.options as { id: string; isCorrect?: boolean }[] | undefined
      const correctOption = options?.find((o) => o.isCorrect)
      const correctId = correctOption?.id ?? (content.correctOptionId as string | undefined)
      const isCorrect = typeof userAnswer === 'string' && correctId === userAnswer
      return { isCorrect }
    }

    case 'TEST_MULTIPLE': {
      const options = content.options as { id: string; isCorrect?: boolean }[] | undefined
      const correctIds = new Set(
        options?.filter((o) => o.isCorrect).map((o) => o.id) ??
          (content.correctOptionIds as string[] | undefined) ??
          [],
      )
      const userIds = new Set(Array.isArray(userAnswer) ? userAnswer.map(String) : [])

      if (correctIds.size !== userIds.size) {
        return { isCorrect: false }
      }

      const isCorrect = [...userIds].every((id) => correctIds.has(id))
      return { isCorrect }
    }

    case 'MATCHING': {
      const correctPairs = (content.pairs as { leftId: string; rightId: string }[]) ?? []
      const userMap = typeof userAnswer === 'object' && !Array.isArray(userAnswer) ? userAnswer : {}

      const isCorrect =
        correctPairs.length === Object.keys(userMap).length &&
        correctPairs.every((p) => userMap[p.leftId] === p.rightId)

      return { isCorrect }
    }

    case 'ORDERING': {
      const correctOrder =
        (content.correctOrder as string[]) ??
        ((content.items as { id: string }[]) ?? []).map((i) => i.id)

      const userOrder = Array.isArray(userAnswer) ? userAnswer : []
      const isCorrect = JSON.stringify(correctOrder) === JSON.stringify(userOrder)
      return { isCorrect }
    }

    case 'INPUT_TEXT': {
      const validAnswers = (content.correctAnswers as string[]) ?? []
      if (typeof userAnswer !== 'string') {
        return { isCorrect: false }
      }

      const userText = userAnswer.trim().toLowerCase()

      const isCorrect = validAnswers.some((ans) => ans.trim().toLowerCase() === userText)
      return { isCorrect }
    }

    case 'INPUT_NUMBER': {
      const correctAnswer = content.correctAnswer as number | undefined
      const isCorrect = correctAnswer !== undefined && Number(userAnswer) === correctAnswer
      return { isCorrect }
    }

    case 'FILL_GAPS': {
      const gaps = (content.gaps as { id: string; correctAnswer: string }[]) ?? []
      const userMap = typeof userAnswer === 'object' && !Array.isArray(userAnswer) ? userAnswer : {}

      const isCorrect = gaps.every((gap) => {
        const userVal = String(userMap[gap.id] ?? '')
          .trim()
          .toLowerCase()
        const correctVal = String(gap.correctAnswer).trim().toLowerCase()
        return userVal === correctVal
      })

      return { isCorrect }
    }

    default:
      return { isCorrect: false }
  }
}
