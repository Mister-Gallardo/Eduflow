import { Box, CircularProgress } from '@mui/material'

import { fullPageLoaderStyles } from './FullPageLoader.styles'

export const FullPageLoader = () => (
  <Box sx={fullPageLoaderStyles}>
    <CircularProgress size={48} thickness={4} />
  </Box>
)
