import { Box, Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Logo } from '@/shared/ui/data-display/logo'

const CURRENT_YEAR = new Date().getFullYear()

export const AuthLayout = () => {
  return (
    <Box
      component="main"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#F8F9FC"
      py={4}
    >
      <Container maxWidth="sm">
        <Box mb={4} textAlign="center">
          <Logo size="medium" isAnimated />
        </Box>

        <Outlet />

        <Typography
          variant="caption"
          textAlign="center"
          mt={4}
          color="text.secondary"
          display="block"
        >
          © {CURRENT_YEAR} Eduflow
        </Typography>
      </Container>
    </Box>
  )
}
