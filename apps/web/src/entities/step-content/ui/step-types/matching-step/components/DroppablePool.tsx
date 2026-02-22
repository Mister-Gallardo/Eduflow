import { useDroppable } from '@dnd-kit/core'
import { Box } from '@mui/material'

import { getPoolContainerStyles } from '../MatchingStep.styles'

export interface DroppablePoolProps {
  isChecked: boolean
  children: React.ReactNode
}

export const DroppablePool = ({ isChecked, children }: DroppablePoolProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'pool',
    disabled: isChecked,
    data: { type: 'pool' },
  })

  return (
    <Box ref={setNodeRef} sx={getPoolContainerStyles(isOver)}>
      {children}
    </Box>
  )
}
