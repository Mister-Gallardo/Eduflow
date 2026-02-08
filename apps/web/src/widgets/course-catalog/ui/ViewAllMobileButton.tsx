import { ArrowForward } from '@mui/icons-material'
import { Box, ButtonBase, Typography, useTheme } from '@mui/material'

import { viewAllMobileButtonStyles } from './CourseCatalog.styles'

export const ViewAllMobileButton = () => {
  const theme = useTheme()

  const handleClick = () => {
    console.info('pressed')
  }

  return (
    <Box sx={viewAllMobileButtonStyles}>
      <ButtonBase
        disableRipple
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          p: 1,
          borderRadius: 2,
          transition: 'transform 0.2s ease',
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: theme.palette.primary.main,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowForward />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            textAlign: 'center',
          }}
        >
          Смотреть все
        </Typography>
      </ButtonBase>
    </Box>
  )
}
