import type { Step } from '@eduflow/shared'
import { Typography } from '@mui/material'
import { lazy, Suspense } from 'react'

import { SolveTextStep } from '@/features/solve-step'
import { SolveTestStep } from '@/features/solve-step'

import { StepContentSkeleton } from './step-content-skeleton'

const SolveMatchingStep = lazy(() =>
  import('@/features/solve-step/ui/solve-matching-step').then((m) => ({
    default: m.SolveMatchingStep,
  })),
)

const SolveVideoStep = lazy(() =>
  import('@/features/solve-step/ui/solve-video-step').then((m) => ({
    default: m.SolveVideoStep,
  })),
)

const EditTextStep = lazy(() =>
  import('@/features/edit-step/ui/EditTextStep').then((m) => ({ default: m.EditTextStep })),
)
// const EditTestStep = lazy(() =>
//   import('@/features/edit-step/ui/EditTestStep').then((m) => ({ default: m.EditTestStep })),
// )
// const EditMatchingStep = lazy(() =>
//   import('@/features/edit-step/ui/EditMatchingStep').then((m) => ({ default: m.EditMatchingStep })),
// )

interface StepRendererViewProps {
  step: Step
  mode?: 'view'
  courseId: string
  stepId: string
  isCompleted?: boolean
  savedAnswer?: unknown
}

/**
 * Edit-mode props для преподавателя.
 * courseId/stepId/isCompleted не нужны — форма управляет локальным state.
 */
interface StepRendererEditProps {
  step: Step
  mode: 'edit'
  /* Вызывается при любом изменении content в форме */
  onContentChange?: (content: unknown) => void
}

export type StepRendererProps = StepRendererViewProps | StepRendererEditProps

/**
 * Диспетчер режима отображения шага.
 * mode='view' (default) → features/solve-step: умные контейнеры для студента.
 * mode='edit'           → features/edit-step: формы создания/редактирования для преподавателя.
 */
export const StepRenderer = (props: StepRendererProps) => {
  const { step, mode = 'view' } = props

  if (mode === 'view') {
    const { courseId, stepId, isCompleted, savedAnswer } = props as StepRendererViewProps

    switch (step.type) {
      case 'TEXT':
        return <SolveTextStep content={step.content} />

      case 'VIDEO':
        return <SolveVideoStep content={step.content} />

      case 'TEST_SINGLE':
      case 'TEST_MULTIPLE':
        return (
          <SolveTestStep
            key={stepId}
            content={step.content}
            testType={step.type}
            courseId={courseId}
            stepId={stepId}
            isCompleted={isCompleted}
            savedAnswer={savedAnswer as string | string[] | null | undefined}
          />
        )

      case 'MATCHING':
        return (
          <Suspense fallback={<StepContentSkeleton />}>
            <SolveMatchingStep
              content={step.content}
              courseId={courseId}
              stepId={stepId}
              isCompleted={isCompleted}
              savedAnswer={savedAnswer as Record<string, string> | null | undefined}
            />
          </Suspense>
        )

      default:
        return (
          <Typography variant="h6" color="error">
            Тип контента &quot;{step.type}&quot; пока не поддерживается
          </Typography>
        )
    }
  }

  // ─── Режим редактирования (преподаватель) ───
  //
  // Edit-компоненты управляют локальным state через свои хуки.
  // onContentChange вызывается при изменениях для синхронизации с внешней формой страницы.
  switch (step.type) {
    case 'TEXT':
      return (
        <Suspense fallback={<StepContentSkeleton />}>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <EditTextStep html={step.content.html} onChange={() => {}} />
        </Suspense>
      )

    case 'TEST_SINGLE':
    case 'TEST_MULTIPLE':
      return (
        <Suspense fallback={<StepContentSkeleton />}>
          {/* EditTestStep управляет state через useTestStepForm — используется в реальном редакторе */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
            Для редактирования шага используйте useTestStepForm из features/edit-step.
          </Typography>
        </Suspense>
      )

    case 'MATCHING':
      return (
        <Suspense fallback={<StepContentSkeleton />}>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
            Для редактирования шага используйте useMatchingStepForm из features/edit-step.
          </Typography>
        </Suspense>
      )

    default:
      return (
        <Typography variant="h6" color="error">
          Тип контента &quot;{step.type}&quot; пока не поддерживается
        </Typography>
      )
  }
}
