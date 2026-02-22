import { useDraggable } from '@dnd-kit/core'
import { Box, Typography } from '@mui/material'

import { getMatchingChipStyles } from '../../../../lib/utils'
import { StepOptionIndicator } from '../../../step-option-indicator'

export interface DraggableChipProps {
  id: string
  content: string
  isChecked: boolean
  isCorrect?: boolean
  isInPool: boolean
  dndDisabled?: boolean
  onClick: () => void
}

export const DraggableChip = ({
  id,
  content,
  isChecked,
  isCorrect,
  isInPool,
  dndDisabled = false,
  onClick,
}: DraggableChipProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isChecked || dndDisabled,
    data: { type: 'chip', content, origin: isInPool ? 'pool' : 'slot' },
  })

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={isChecked || dndDisabled ? (dndDisabled ? onClick : undefined) : onClick}
      sx={{
        ...getMatchingChipStyles(isChecked, isCorrect, isInPool),
        opacity: isDragging ? 0.3 : 1,
        touchAction: 'none',
      }}
    >
      <Typography
        component="span"
        sx={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 1.4 }}
      >
        {content}
      </Typography>

      <StepOptionIndicator isVisible={isChecked && isCorrect !== undefined} isCorrect={isCorrect} />
    </Box>
  )
}
