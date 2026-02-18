import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { Box, Button, Divider, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

import { paths } from '@/shared/config/paths'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { Logo } from '@/shared/ui/data-display/logo'

interface LearnHeaderLeftProps {
  sidebarOpen: boolean
  setSidebarOpen: (state: boolean) => void
}

export const LearnHeaderLeft = ({ sidebarOpen, setSidebarOpen }: LearnHeaderLeftProps) => {
  const isMobile = useIsMobile()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 1.5 }}>
      {/* Гамбургер */}
      <IconButton
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Переключить сайдбар"
        size="medium"
        sx={{
          color: 'text.primary',
          ml: '-11px',
        }}
      >
        {sidebarOpen && isMobile ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center' }} />

      {/* Кнопка "На главную" */}
      <Button
        component={Link}
        to={paths.home()}
        size="small"
        startIcon={<ArrowBackIcon />}
        sx={{
          color: 'text.secondary',
          minWidth: 'fit-content',
          fontWeight: 500,
          fontSize: 13,
          px: 1,

          '& .MuiButton-icon': {
            mr: isMobile ? 0 : 1,
          },
        }}
      >
        {!isMobile && 'На главную'}
      </Button>

      <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center', mr: 1 }} />

      {/* Логотип */}
      <Logo size="extraSmall" isClickable={true} isAnimated={false} showText={!isMobile} />
    </Box>
  )
}
