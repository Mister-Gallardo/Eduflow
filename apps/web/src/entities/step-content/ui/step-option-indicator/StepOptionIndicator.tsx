import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { Box } from '@mui/material'

interface StepOptionIndicatorProps {
  isVisible?: boolean
  isCorrect?: boolean
}

export const StepOptionIndicator = ({ isVisible = true, isCorrect }: StepOptionIndicatorProps) => {
  if (!isVisible) return null

  return (
    <Box
      sx={{
        ml: 'auto',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
      }}
    >
      {isCorrect ? (
        <CheckCircleOutlinedIcon
          sx={{
            fontSize: 24,
            color: (theme) => theme.palette.customColors.green,
          }}
        />
      ) : (
        <CancelOutlinedIcon
          sx={{
            fontSize: 24,
            color: (theme) => theme.palette.customColors.red,
          }}
        />
      )}
    </Box>
  )
}
