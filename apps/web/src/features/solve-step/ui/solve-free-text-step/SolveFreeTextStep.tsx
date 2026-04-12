import { FreeTextStep } from '@/entities/step-content'
import { StepSubmitActions } from '@/entities/step-content/ui/step-result-actions'

import type { SolveFreeTextStepProps } from '../../model'
import { useFreeTextStep } from '../../model/use-free-text-step'

export const SolveFreeTextStep = ({
  content,
  courseId,
  stepId,
  status,
  savedAnswer,
  reviewComment,
}: SolveFreeTextStepProps) => {
  const { value, isSubmitted, isPending, canSubmit, onChange, onSubmit, onRetry } = useFreeTextStep(
    { content, courseId, stepId, status, savedAnswer },
  )

  return (
    <>
      <FreeTextStep
        content={content}
        value={value}
        isSubmitted={isSubmitted}
        status={status}
        onChange={onChange}
        reviewComment={reviewComment}
      />
      <StepSubmitActions
        status={status}
        canSubmit={canSubmit}
        isPending={isPending}
        isSubmitted={isSubmitted}
        onSubmit={onSubmit}
        onEdit={onRetry}
      />
    </>
  )
}
