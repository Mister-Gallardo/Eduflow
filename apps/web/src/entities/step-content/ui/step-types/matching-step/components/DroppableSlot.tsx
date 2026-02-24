import { useDroppable } from '@dnd-kit/core'
import { Box } from '@mui/material'

import { getMatchingSlotStyles } from '../../../../lib/utils'

export interface DroppableSlotProps {
  leftId: string
  isMatched: boolean
  isChecked: boolean
  children: React.ReactNode
}

export const DroppableSlot = ({ leftId, isMatched, isChecked, children }: DroppableSlotProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: leftId,
    disabled: isChecked,
    data: { type: 'slot' },
  })

  return (
    <Box ref={setNodeRef} sx={getMatchingSlotStyles(isMatched, isOver)}>
      {children}
    </Box>
  )
}
