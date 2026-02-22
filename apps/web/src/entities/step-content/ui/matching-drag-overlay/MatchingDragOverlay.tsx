import { DragOverlay } from '@dnd-kit/core'
import { alpha, Box, Typography } from '@mui/material'
import { createPortal } from 'react-dom'

import { getMatchingChipStyles } from '@/entities/step-content/lib/utils'

interface MatchingDragOverlayProps {
  activeDragId: string | null
  activeContent: string | null | undefined
}

export const MatchingDragOverlay = ({ activeDragId, activeContent }: MatchingDragOverlayProps) =>
  createPortal(
    <DragOverlay>
      {activeDragId ? (
        <Box
          sx={{
            ...getMatchingChipStyles(false, undefined, true),
            boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
            cursor: 'grabbing',
          }}
        >
          <Typography
            component="span"
            sx={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 1.4 }}
          >
            {activeContent}
          </Typography>
        </Box>
      ) : null}
    </DragOverlay>,
    document.body,
  )
