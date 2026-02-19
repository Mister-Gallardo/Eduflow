import {
  type EnrollCourseInput,
  type GetCourseNavigationInput,
  type GetStepDataInput,
  omit,
} from '@eduflow/shared'
import { TRPCError } from '@trpc/server'

import type { AuthorizedContext } from '../../trpc/context.js'

export const enrollService = async (ctx: AuthorizedContext, input: EnrollCourseInput) => {
  const user = ctx.me

  const { courseId } = input

  // Check if course exists
  const course = await ctx.db.course.findUnique({
    where: { id: courseId },
  })

  if (!course) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Course not found' })
  }

  // Check if user already enrolled
  const existingEnrollment = await ctx.db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
  })

  if (existingEnrollment) {
    return { success: true, message: 'Already enrolled' }
  }

  await ctx.db.enrollment.create({
    data: {
      userId: user.id,
      courseId,
    },
  })

  return { success: true }
}

export const getCourseNavigationService = async (
  ctx: AuthorizedContext,
  input: GetCourseNavigationInput,
) => {
  const user = ctx.me

  const { courseId } = input

  // Check enrollment
  const enrollment = await ctx.db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
    include: {
      course: {
        select: {
          title: true,
        },
      },
    },
  })

  if (!enrollment) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Not enrolled in this course' })
  }

  const modules = await ctx.db.module.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          steps: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              type: true,
              order: true,
              // We don't select content here to keep it lightweight and secure
            },
          },
        },
      },
    },
  })

  // Get user progress
  const progress = await ctx.db.userProgress.findMany({
    where: {
      userId: user.id,
      step: {
        lesson: {
          module: {
            courseId,
          },
        },
      },
    },
    select: {
      stepId: true,
      isCompleted: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  const progressMap = new Map(progress.map((p) => [p.stepId, p.isCompleted]))

  // Find last viewed step (most recently updated progress)
  // If no progress, default to the first step of the first lesson of the first module.
  let lastViewedStepId = progress[0]?.stepId

  if (!lastViewedStepId && modules.length > 0) {
    const firstModule = modules[0]
    if (firstModule && firstModule.lessons.length > 0) {
      const firstLesson = firstModule.lessons[0]
      if (firstLesson && firstLesson.steps.length > 0) {
        lastViewedStepId = firstLesson.steps[0].id
      }
    }
  }

  // Transform to navigation tree with progress
  const navigation = modules.map((module) => ({
    id: module.id,
    title: module.title,
    lessons: module.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      steps: lesson.steps.map((step) => ({
        id: step.id,
        title: step.title,
        type: step.type,
        isCompleted: progressMap.get(step.id) ?? false,
      })),
    })),
  }))

  return { navigation, lastViewedStepId, courseTitle: enrollment.course.title }
}

export const getStepDataService = async (ctx: AuthorizedContext, input: GetStepDataInput) => {
  const user = ctx.me

  const { courseId, stepId } = input

  const step = await ctx.db.step.findUnique({
    where: {
      id: stepId,
      lesson: {
        module: {
          courseId: courseId,
        },
      },
    },
    include: {
      lesson: {
        include: {
          module: true,
        },
      },
    },
  })

  if (!step) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Step not found' })
  }

  const enrollment = await ctx.db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: step.lesson.module.courseId,
      },
    },
  })

  if (!enrollment) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Not enrolled in this course' })
  }

  // Remove sensitive data (answers) from content
  // Assuming content is a flexible JSON, we need a strategy to strip answers.
  // This depends on how we structure the JSON.
  // detailed parsing logic should be here.
  // const safeContent = stripAnswers(step.content, step.type)

  // return {
  //   ...step,
  //   content: safeContent,
  // }

  return {
    step: omit(step, ['lesson', 'lessonId']),
  }
}

// const stripAnswers = (content: any, type: string) => {
//   // Deep copy to avoid mutating original
//   const safe = JSON.parse(JSON.stringify(content))

//   switch (type) {
//     case 'TEST_SINGLE':
//       if (safe.options && Array.isArray(safe.options)) {
//         safe.options.forEach((opt: any) => delete opt.isCorrect)
//       }
//       delete safe.correctOptionId
//       break

//     case 'TEST_MULTIPLE':
//       if (safe.options && Array.isArray(safe.options)) {
//         safe.options.forEach((opt: any) => delete opt.isCorrect)
//       }
//       delete safe.correctOptionIds
//       break

//     case 'MATCHING':
//       // content: { left: [], right: [], pairs: [{leftId, rightId}] }
//       // Remove pairs which is the key.
//       delete safe.pairs
//       // Ensure left and right sides are just items
//       // (Right side might need shuffling in frontend, or here if we want to be super safe)
//       break

//     case 'ORDERING':
//       // content: { items: [{id, content}] }
//       // Remove correctOrder if present (it might be implicit in items order in DB)
//       // We should shuffle items here so frontend receives them random?
//       // Requirement says: "Перемешивай исходный массив элементов и удаляй correctOrder"
//       if (safe.items && Array.isArray(safe.items)) {
//         safe.items = safe.items
//           .map((value: any) => ({ value, sort: Math.random() }))
//           .sort((a: any, b: any) => a.sort - b.sort)
//           .map(({ value }: any) => value)
//       }
//       delete safe.correctOrder
//       break

//     case 'FILL_GAPS':
//       // content: { text: "...", gaps: [{id, type, options, correctAnswer}] }
//       if (safe.gaps && Array.isArray(safe.gaps)) {
//         safe.gaps.forEach((gap: any) => delete gap.correctAnswer)
//       }
//       break

//     case 'INPUT_TEXT':
//       delete safe.correctAnswers
//       break

//     case 'INPUT_NUMBER':
//       delete safe.correctAnswer
//       break

//     case 'TABLE':
//       delete safe.correctCells
//       break

//     case 'TEXT':
//     case 'VIDEO':
//     case 'TEXT_IMAGE':
//     case 'TEXT_VIDEO':
//       // No sensitive data
//       break

//     case 'FREE_TEXT':
//       // No automatic correct answer to hide
//       break
//   }

//   return safe
// }

// export const checkStepService = async (ctx: Context, input: CheckStepInput) => {
//   const { user } = ctx
//   if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

//   const { stepId, answer } = input

//   const step = await ctx.db.step.findUnique({
//     where: { id: stepId },
//   })

//   if (!step) {
//     throw new TRPCError({ code: 'NOT_FOUND', message: 'Step not found' })
//   }

//   // Validate answer logic
//   const { isCorrect, score } = validateAnswer(step.content, step.type, answer)

//   // Update progress
//   await ctx.db.userProgress.upsert({
//     where: {
//       userId_stepId: {
//         userId: user.id,
//         stepId,
//       },
//     },
//     update: {
//       isCompleted: isCorrect, // For Free Text this will be true (pending review)
//       score,
//       answer, // Save user's answer
//       updatedAt: new Date(),
//     },
//     create: {
//       userId: user.id,
//       stepId,
//       isCompleted: isCorrect,
//       score,
//       answer,
//     },
//   })

//   return { isCorrect, score }
// }

// const validateAnswer = (
//   content: any,
//   type: string,
//   userAnswer: any,
// ): { isCorrect: boolean; score: number | null } => {
//   if (!content) return { isCorrect: false, score: 0 }

//   switch (type) {
//     case 'TEST_SINGLE': {
//       // User sends optionId
//       const correctOption = content.options?.find((o: any) => o.isCorrect)
//       // Fallback: check correctOptionId
//       const correctId = correctOption?.id || content.correctOptionId
//       const isCorrect = String(correctId) === String(userAnswer)
//       return { isCorrect, score: isCorrect ? 100 : 0 }
//     }

//     case 'TEST_MULTIPLE': {
//       // User sends array of optionIds. Order doesn't matter.
//       const correctIds = new Set(
//         content.options?.filter((o: any) => o.isCorrect).map((o: any) => o.id) ||
//           content.correctOptionIds ||
//           [],
//       )
//       const userIds = new Set(Array.isArray(userAnswer) ? userAnswer : [])

//       if (correctIds.size !== userIds.size) return { isCorrect: false, score: 0 }

//       const isCorrect = [...userIds].every((id) => correctIds.has(String(id)))
//       return { isCorrect, score: isCorrect ? 100 : 0 }
//     }

//     case 'MATCHING': {
//       // User sends object { leftId: rightId }
//       // Content has pairs: [{leftId, rightId}]
//       const correctPairs = content.pairs || []
//       const userMap = userAnswer || {}

//       // Check if every correct pair exists in user map
//       const isCorrect =
//         correctPairs.every((p: any) => userMap[p.leftId] === p.rightId) &&
//         Object.keys(userMap).length === correctPairs.length

//       return { isCorrect, score: isCorrect ? 100 : 0 }
//     }

//     case 'ORDERING': {
//       // User sends array of IDs in order
//       const correctOrder = content.correctOrder || content.items?.map((i: any) => i.id)

//       const isCorrect = JSON.stringify(correctOrder) === JSON.stringify(userAnswer)
//       return { isCorrect, score: isCorrect ? 100 : 0 }
//     }

//     case 'INPUT_TEXT': {
//       const validAnswers = content.correctAnswers || []
//       const userText = String(userAnswer).trim().toLowerCase()

//       const isCorrect = validAnswers.some((ans: string) => ans.trim().toLowerCase() === userText)
//       return { isCorrect, score: isCorrect ? 100 : 0 }
//     }

//     case 'INPUT_NUMBER': {
//       const validAnswer = content.correctAnswer
//       const isCorrect = Number(userAnswer) === Number(validAnswer)
//       return { isCorrect, score: isCorrect ? 100 : 0 }
//     }

//     case 'FILL_GAPS': {
//       // User sends { gapId: value }
//       const gaps = content.gaps || []
//       const userMap = userAnswer || {}

//       const isCorrect = gaps.every((gap: any) => {
//         const userVal = String(userMap[gap.id] || '')
//           .trim()
//           .toLowerCase()
//         const correctVal = String(gap.correctAnswer).trim().toLowerCase()
//         return userVal === correctVal
//       })

//       return { isCorrect, score: isCorrect ? 100 : 0 }
//     }

//     case 'TABLE': {
//       // User sends array of cellIds that are selected (for simple selection table)
//       // Or logic could be more complex. Assuming selection for now.
//       const correctCells = new Set(content.correctCells || [])
//       const userCells = new Set(Array.isArray(userAnswer) ? userAnswer : [])

//       if (correctCells.size !== userCells.size) return { isCorrect: false, score: 0 }
//       const isCorrect = [...userCells].every((id) => correctCells.has(String(id)))

//       return { isCorrect, score: isCorrect ? 100 : 0 }
//     }

//     case 'FREE_TEXT':
//       // Always allow passing, but marks as pending review logic (handled by isCompleted=true for now per requirement)
//       return { isCorrect: true, score: null }

//     case 'TEXT':
//     case 'VIDEO':
//     case 'TEXT_IMAGE':
//     case 'TEXT_VIDEO':
//       return { isCorrect: true, score: 100 }

//     default:
//       return { isCorrect: false, score: 0 }
//   }
// }
