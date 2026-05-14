import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { alpha, Box, Typography } from '@mui/material'
import { createPortal } from 'react-dom'

import { StepCheckActions } from '@/entities/step-content/ui/step-result-actions'
import { OrderingStep } from '@/entities/step-content/ui/step-types/ordering-step'
import { getOrderingItemStyles } from '@/entities/step-content/ui/step-types/ordering-step/OrderingStep.styles'

import type { SolveOrderingStepProps } from '../../model'
import { useOrderingStep } from '../../model/use-ordering-step'

export const SolveOrderingStep = ({
  content,
  courseId,
  stepId,
  status,
  savedAnswer,
}: SolveOrderingStepProps) => {
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
    orderedIds,
    isSubmitted,
    isCorrect,
    isPending,
    canCheck,
    activeDragId,
    callbacks,
    onCheck,
    onRetry,
  } = useOrderingStep({ content, courseId, stepId, status, savedAnswer })

  const activeItem = activeDragId ? displayContent.items.find((i) => i.id === activeDragId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={callbacks.onDragStart}
      onDragEnd={callbacks.onDragEnd}
      onDragCancel={callbacks.onDragCancel}
    >
      <OrderingStep
        content={displayContent}
        orderedIds={orderedIds}
        isChecked={isSubmitted}
        isCorrect={isSubmitted ? isCorrect : undefined}
      />

      <StepCheckActions
        canCheck={canCheck}
        isPending={isPending}
        isSubmitted={isSubmitted}
        isCorrect={isCorrect}
        onCheck={onCheck}
        onRetry={onRetry}
      />

      {createPortal(
        <DragOverlay>
          {activeItem ? (
            <Box
              sx={{
                ...getOrderingItemStyles(false),
                boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                cursor: 'grabbing',
              }}
            >
              <Typography component="span" sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
                {activeItem.content}
              </Typography>
            </Box>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
