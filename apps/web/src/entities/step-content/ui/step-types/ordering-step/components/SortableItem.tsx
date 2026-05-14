import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Box, Typography } from '@mui/material'

import { StepOptionIndicator } from '../../../step-option-indicator'
import {
  dragHandleStyles,
  getOrderingIndexStyles,
  getOrderingItemStyles,
} from '../OrderingStep.styles'

export interface SortableItemProps {
  id: string
  content: string
  index: number
  isChecked: boolean
  isCorrect?: boolean
  disabled?: boolean
}

export const SortableItem = ({
  id,
  content,
  index,
  isChecked,
  isCorrect,
  disabled = false,
}: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: disabled || isChecked,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ cursor: disabled || isChecked ? 'default' : 'grab', touchAction: 'none' }}
    >
      <Box sx={getOrderingItemStyles(isChecked, isCorrect, isDragging)}>
        {/* Drag handle indicator (visual only) */}
        {!isChecked && (
          <Box sx={dragHandleStyles}>
            <DragIndicatorIcon sx={{ fontSize: 20 }} />
          </Box>
        )}

        {/* Номер позиции */}
        <Box sx={getOrderingIndexStyles(isChecked, isCorrect)}>{index + 1}</Box>

        {/* Текст элемента */}
        <Typography
          component="span"
          sx={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 1.4, flex: 1 }}
        >
          {content}
        </Typography>

        {/* Индикатор правильности */}
        <StepOptionIndicator
          isVisible={isChecked && isCorrect !== undefined}
          isCorrect={isCorrect}
        />
      </Box>
    </Box>
  )
}
