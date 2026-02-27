import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { Button, type SxProps } from '@mui/material'
import { Link } from 'react-router-dom'

import { paths } from '@/shared/config/paths'

interface LoginPromptProps {
  fullWidth?: boolean
  sx?: SxProps
}

export const LoginPrompt = ({ fullWidth = false, sx }: LoginPromptProps) => {
  return (
    <Button
      component={Link}
      to={paths.auth()}
      variant="contained"
      size="small"
      fullWidth={fullWidth}
      startIcon={<LoginOutlinedIcon />}
      sx={{ ...sx, fontSize: 14, px: 2.5, py: 0.75 }}
      disableElevation
    >
      Войти
    </Button>
  )
}
