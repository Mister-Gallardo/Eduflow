import type { StepStatus } from '@eduflow/shared'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import { Box, Button, IconButton } from '@mui/material'

import { getResultBadgeStyles } from '../../lib'

import {
  actionsContainerStyles,
  retryButtonStyles,
  submitButtonStyles,
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
          <Box sx={getResultBadgeStyles(status)}>
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
          <Box sx={getResultBadgeStyles(status)}>
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
          <Box sx={getResultBadgeStyles(status)}>
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
          sx={submitButtonStyles}
        >
          {isPending ? 'Отправляем...' : 'Отправить на проверку'}
        </Button>
      </Box>
    )
  }
}
