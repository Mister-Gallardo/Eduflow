import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import { Box, Button, IconButton } from '@mui/material'
import { darken } from '@mui/material/styles'

import {
  actionsContainerStyles,
  getResultBadgeStyles,
  retryButtonStyles,
} from './StepResultActions.styles'

interface StepCheckActionsProps {
  canCheck: boolean
  isPending?: boolean
  isSubmitted: boolean
  isCorrect?: boolean
  onCheck: () => void
  onRetry: () => void
  checkLabel?: string
}

export const StepCheckActions = ({
  canCheck,
  isPending = false,
  isSubmitted,
  isCorrect = false,
  onCheck,
  onRetry,
}: StepCheckActionsProps) => {
  if (isSubmitted) {
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
  } else {
    return (
      <Box sx={actionsContainerStyles}>
        <Button
          variant="contained"
          onClick={onCheck}
          disabled={!canCheck || isPending}
          sx={{
            px: 4,
            py: 1,
            bgcolor: (theme) => theme.palette.customColors.indigo,
            '&:hover': {
              bgcolor: (theme) => darken(theme.palette.customColors.indigo, 0.1),
            },
          }}
        >
          {isPending ? 'Отправляем...' : 'Проверить'}
        </Button>
      </Box>
    )
  }
}
