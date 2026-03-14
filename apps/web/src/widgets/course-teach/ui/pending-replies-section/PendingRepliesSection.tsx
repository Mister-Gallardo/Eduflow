import type { PendingSubmission } from '@eduflow/shared'
import { Box, Button, Chip, Typography } from '@mui/material'
import { alpha, darken } from '@mui/material/styles'
import { AnimatePresence } from 'motion/react'

import { ReplyCard } from '../reply-card'

export interface PendingRepliesSectionProps {
  replies: PendingSubmission[]
  isLoading: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  expandedId: string | null
  onToggle: (id: string) => void
}

export const PendingRepliesSection = ({
  replies,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  expandedId,
  onToggle,
}: PendingRepliesSectionProps) => {
  if (replies.length === 0 && !isLoading) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Ожидают проверки
        </Typography>
        <Chip
          label={replies.length}
          size="small"
          sx={{
            height: 22,
            minWidth: 22,
            fontSize: '0.75rem',
            fontWeight: 700,
            bgcolor: (theme) => alpha(theme.palette.customColors.orange, 0.12),
            color: (theme) => darken(theme.palette.customColors.orange, 0.1),
          }}
        />
      </Box>

      <AnimatePresence mode="popLayout">
        {replies.map((reply) => (
          <ReplyCard
            key={`pending-${reply.id}`}
            reply={reply}
            expanded={expandedId === reply.id}
            onToggle={onToggle}
            mode="pending"
          />
        ))}
      </AnimatePresence>

      {hasNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
          <Button
            variant="outlined"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 4,
              fontWeight: 500,
            }}
          >
            Показать ещё
          </Button>
        </Box>
      )}
    </Box>
  )
}
