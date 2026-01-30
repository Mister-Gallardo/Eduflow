import { Box, CircularProgress } from '@mui/material'

export const FullPageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'background.default',
    }}
  >
    <CircularProgress size={48} thickness={4} />
  </Box>
)
