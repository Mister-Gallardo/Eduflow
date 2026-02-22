import { TestStep } from '@/entities/step-content'
import { StepCheckActions } from '@/entities/step-content/ui/step-result-actions'

import type { SolveTestStepProps } from '../../model'
import { useTestStep } from '../../model/use-test-step'

export const SolveTestStep = ({
  content,
  testType,
  courseId,
  stepId,
  isCompleted,
  savedAnswer,
}: SolveTestStepProps) => {
  const {
    selectedIds,
    isChecked,
    isCorrect,
    isPending,
    canCheck,
    onSelectOption,
    onCheck,
    onRetry,
  } = useTestStep({ content, testType, courseId, stepId, isCompleted, savedAnswer })

  return (
    <>
      <TestStep
        content={content}
        testType={testType}
        selectedIds={selectedIds}
        isChecked={isChecked}
        isCorrect={isCorrect}
        onSelectOption={onSelectOption}
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
