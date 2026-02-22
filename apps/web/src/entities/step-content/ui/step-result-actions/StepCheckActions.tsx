import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import { Box, Button, IconButton } from '@mui/material'

import {
  actionsContainerStyles,
  getResultBadgeStyles,
  retryButtonStyles,
} from './StepCheckActions.styles'

interface StepCheckActionsProps {
  canCheck: boolean
  isPending?: boolean
  isChecked: boolean
  isCorrect?: boolean
  onCheck: () => void
  onRetry: () => void
  checkLabel?: string
}

export const StepCheckActions = ({
  canCheck,
  isPending = false,
  isChecked,
  isCorrect = false,
  onCheck,
  onRetry,
  checkLabel = 'Проверить',
}: StepCheckActionsProps) => {
  if (!isChecked) {
    return (
      <Box sx={actionsContainerStyles}>
        <Button
          variant="contained"
          onClick={onCheck}
          disabled={!canCheck || isPending}
          sx={{ px: 4, py: 1 }}
        >
          {checkLabel}
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={actionsContainerStyles}>
      <Box sx={getResultBadgeStyles(isCorrect)}>
        {isCorrect ? (
          <CheckCircleOutlinedIcon sx={{ fontSize: 20 }} />
        ) : (
          <CancelOutlinedIcon sx={{ fontSize: 20 }} />
        )}
        {isCorrect ? 'Правильно!' : 'Неправильно'}
      </Box>

      <IconButton onClick={onRetry} sx={retryButtonStyles} aria-label="Повторить попытку">
        <ReplayOutlinedIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  )
}
