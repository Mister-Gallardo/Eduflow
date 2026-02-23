import { InputStep } from '@/entities/step-content'
import { StepCheckActions } from '@/entities/step-content/ui/step-result-actions'

import type { SolveInputStepProps } from '../../model'
import { useInputStep } from '../../model'

export const SolveInputStep = ({
  content,
  stepType,
  courseId,
  stepId,
  isCompleted,
  savedAnswer,
}: SolveInputStepProps) => {
  const { value, isChecked, isCorrect, isPending, canCheck, onChange, onCheck, onRetry } =
    useInputStep({ content, stepType, courseId, stepId, isCompleted, savedAnswer })

  return (
    <>
      <InputStep
        content={content}
        stepType={stepType}
        value={value}
        isChecked={isChecked}
        isCorrect={isCorrect}
        onChange={onChange}
      />
      <StepCheckActions
        canCheck={canCheck}
        isPending={isPending}
        isChecked={isChecked}
        isCorrect={isCorrect}
        onCheck={onCheck}
        onRetry={onRetry}
      />
    </>
  )
}
