import { InputStep } from '@/entities/step-content'
import { StepCheckActions } from '@/entities/step-content/ui/step-result-actions'

import type { SolveInputStepProps } from '../../model'
import { useInputStep } from '../../model'

export const SolveInputStep = ({
  content,
  stepType,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveInputStepProps) => {
  const { value, isSubmitted, isCorrect, isPending, canCheck, onChange, onCheck, onRetry } =
    useInputStep({ content, stepType, courseId, stepId, status, savedAnswer })

  return (
    <>
      <InputStep
        content={content}
        stepType={stepType}
        value={value}
        isChecked={isSubmitted}
        isCorrect={isCorrect}
        onChange={onChange}
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
