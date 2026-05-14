import { StepCheckActions } from '@/entities/step-content/ui/step-result-actions'
import { FillGapsStep } from '@/entities/step-content/ui/step-types/fill-gaps-step'

import type { SolveFillGapsStepProps } from '../../model'
import { useFillGapsStep } from '../../model/use-fill-gaps-step'

export const SolveFillGapsStep = ({
  content,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveFillGapsStepProps) => {
  const {
    displayContent,
    answers,
    isSubmitted,
    isCorrect,
    isPending,
    canCheck,
    onAnswerChange,
    onCheck,
    onRetry,
  } = useFillGapsStep({ content, courseId, stepId, status, savedAnswer })

  return (
    <>
      <FillGapsStep
        content={displayContent}
        answers={answers}
        isChecked={isSubmitted}
        isCorrect={isSubmitted ? isCorrect : undefined}
        onAnswerChange={onAnswerChange}
      />

      <StepCheckActions
        canCheck={canCheck}
        isPending={isPending}
        isSubmitted={isSubmitted}
        isCorrect={isCorrect}
        onCheck={onCheck}
        onRetry={onRetry}
      />
    </>
  )
}
