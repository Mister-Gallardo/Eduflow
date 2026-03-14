import type { PendingSubmission } from '@eduflow/shared'
import { alpha, Box, Button, Chip, darken, Typography } from '@mui/material'
import { AnimatePresence } from 'motion/react'

import { ReplyCard } from '../reply-card'

export interface ReviewedRepliesSectionProps {
  replies: PendingSubmission[]
  isLoading: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  expandedId: string | null
  onToggle: (id: string) => void
}

export const ReviewedRepliesSection = ({
  replies,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  expandedId,
  onToggle,
}: ReviewedRepliesSectionProps) => {
  if (replies.length === 0 && !isLoading) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Проверенные
        </Typography>
        <Chip
          label={replies.length}
          size="small"
          sx={{
            height: 22,
            minWidth: 22,
            fontSize: '0.75rem',
            fontWeight: 700,
            bgcolor: (theme) => alpha(theme.palette.customColors.green, 0.12),
            color: (theme) => darken(theme.palette.customColors.green, 0.1),
          }}
        />
      </Box>

      <AnimatePresence mode="popLayout">
        {replies.map((reply) => (
          <ReplyCard
            key={`reviewed-${reply.id}`}
            reply={reply}
            expanded={expandedId === reply.id}
            onToggle={onToggle}
            mode="reviewed"
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
