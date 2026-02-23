import { TestStep } from '@/entities/step-content'
import { StepCheckActions } from '@/entities/step-content/ui/step-result-actions'

import type { SolveTestStepProps } from '../../model'
import { useTestStep } from '../../model/use-test-step'

export const SolveTestStep = ({
  content,
  testType,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveTestStepProps) => {
  const {
    selectedIds,
    isSubmitted,
    isCorrect,
    isPending,
    canCheck,
    onSelectOption,
    onCheck,
    onRetry,
  } = useTestStep({ content, testType, courseId, stepId, status, savedAnswer })

  return (
    <>
      <TestStep
        content={content}
        testType={testType}
        selectedIds={selectedIds}
        isChecked={isSubmitted}
        isCorrect={isCorrect}
        onSelectOption={onSelectOption}
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
