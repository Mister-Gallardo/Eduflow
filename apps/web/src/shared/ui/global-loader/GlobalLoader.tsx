import { Box, LinearProgress } from '@mui/material'

import { globalLoaderStyles } from './GlobalLoader.styles'

export const GlobalLoader = () => (
  <Box sx={globalLoaderStyles}>
    <LinearProgress
      sx={{
        backgroundColor: 'transparent',
        '& .MuiLinearProgress-bar': {
          backgroundColor: (theme) => theme.palette.customColors.orange,
        },
      }}
    />
  </Box>
)
