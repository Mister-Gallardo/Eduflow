import type { StepStatus } from '@eduflow/shared'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import { Box, Button, IconButton } from '@mui/material'
import { alpha, darken } from '@mui/material/styles'

import {
  actionsContainerStyles,
  getResultBadgeStyles,
  retryButtonStyles,
} from './StepResultActions.styles'

interface StepSubmitActionsProps {
  status?: StepStatus
  canSubmit: boolean
  isPending: boolean
  isSubmitted: boolean
  onSubmit: () => void
  onEdit: () => void
}

export const StepSubmitActions = ({
  status,
  canSubmit,
  isPending,
  isSubmitted,
  onSubmit,
  onEdit,
}: StepSubmitActionsProps) => {
  if (isSubmitted) {
    if (status === 'PENDING') {
      return (
        <Box sx={actionsContainerStyles}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1.25,
              borderRadius: '10px',
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1,
              backgroundColor: (theme) => alpha(theme.palette.customColors.orange, 0.18),
              color: (theme) => darken(theme.palette.customColors.orange, 0.2),
            }}
          >
            <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />
            На проверке
          </Box>
        </Box>
      )
    }

    // Ответ принят
    if (status === 'APPROVED') {
      return (
        <Box sx={actionsContainerStyles}>
          <Box sx={getResultBadgeStyles(true)}>
            <CheckCircleOutlinedIcon sx={{ fontSize: 20 }} />
            Ответ принят!
          </Box>
        </Box>
      )
    }

    // Ответ отклонён — показываем badge + кнопку "Исправить"
    if (status === 'FAILED') {
      return (
        <Box sx={actionsContainerStyles}>
          <Box sx={getResultBadgeStyles(false)}>
            <CancelOutlinedIcon sx={{ fontSize: 20 }} />
            Ответ отклонён
          </Box>

          <IconButton onClick={onEdit} sx={retryButtonStyles} aria-label="Повторить попытку">
            <ReplayOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      )
    }
  } else {
    return (
      <Box sx={actionsContainerStyles}>
        <Button
          variant="contained"
          disabled={!canSubmit || isPending}
          onClick={onSubmit}
          sx={{
            px: 4,
            py: 1,
            bgcolor: (theme) => theme.palette.customColors.indigo,
            '&:hover': {
              bgcolor: (theme) => darken(theme.palette.customColors.indigo, 0.1),
            },
          }}
        >
          {isPending ? 'Отправляем...' : 'Отправить на проверку'}
        </Button>
      </Box>
    )
  }
}
