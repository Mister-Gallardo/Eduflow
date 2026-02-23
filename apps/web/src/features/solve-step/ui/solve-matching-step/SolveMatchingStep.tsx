import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

import { MatchingDragOverlay } from '@/entities/step-content'
import { StepCheckActions } from '@/entities/step-content/ui/step-result-actions'
import { MatchingStep } from '@/entities/step-content/ui/step-types/matching-step'

import type { SolveMatchingStepProps } from '../../model'
import { useMatchingStep } from '../../model/use-matching-step'

export const SolveMatchingStep = ({
  content,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveMatchingStepProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  )

  const {
    displayContent,
    pairs,
    selectedLeftId,
    isSubmitted,
    isCorrect,
    isPending,
    canCheck,
    activeDragId,
    callbacks,
    onCheck,
    onRetry,
  } = useMatchingStep({ content, courseId, stepId, status, savedAnswer })

  const activeOverlayContent = activeDragId
    ? displayContent.right.find((r) => r.id === activeDragId)?.content
    : null

  return (
    <DndContext
      sensors={sensors}
      onDragStart={callbacks.onDragStart}
      onDragEnd={callbacks.onDragEnd}
      onDragCancel={callbacks.onDragCancel}
    >
      <MatchingStep
        content={displayContent}
        pairs={pairs}
        selectedLeftId={selectedLeftId}
        isChecked={isSubmitted}
        pairStatus={isSubmitted ? isCorrect : undefined}
        activeDragId={activeDragId}
        callbacks={callbacks}
      />

      <StepCheckActions
        canCheck={canCheck}
        isPending={isPending}
        isSubmitted={isSubmitted}
        isCorrect={isCorrect}
        onCheck={onCheck}
        onRetry={onRetry}
      />

      <MatchingDragOverlay activeDragId={activeDragId} activeContent={activeOverlayContent} />
    </DndContext>
  )
}
