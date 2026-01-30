import { Box, Container, Typography } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'

import { useMe } from '../../entities/user'
import { paths } from '../../shared/config'
import { FullPageLoader, Logo } from '../../shared/ui'

export const AuthLayout = () => {
  const { data: meData, isLoading: meIsLoading } = useMe()

  if (meIsLoading) return <FullPageLoader />

  if (meData) return <Navigate to={paths.home()} replace />

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
          © {new Date().getFullYear()} Eduflow
        </Typography>
      </Container>
    </Box>
  )
}
