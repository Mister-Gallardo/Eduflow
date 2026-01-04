import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { useMe } from '../../entities/user/model/useMe'
import { LoginForm } from '../../features/auth/login-form'
import { RegisterForm } from '../../features/auth/register-form'

const MotionBox = motion.create(Box)

export const AuthPage = () => {
  const [authMethod, setAuthMethod] = useState<'login' | 'register'>('login')
  const { data: meData, isLoading: meIsLoading } = useMe()

  if (meIsLoading) {
    return null
  }

  if (meData) {
    return <Navigate to="/" replace />
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F9FC',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          {/* <Box
            component="img"
            src="./logo_full.webp"
            // width={190}
            height={48}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              backgroundColor: '#2C3444',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            }}
          /> */}
          <Typography
            component="h1"
            fontWeight="bold"
            sx={{ mb: 1, fontSize: '28px', color: '#111827' }}
          >
            Eduflow{' '}
          </Typography>
          <Typography mt={1} color="text.secondary">
            Интерактивная образовательная платформа
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Tabs
            value={authMethod}
            onChange={(_, newValue) => setAuthMethod(newValue as 'login' | 'register')}
            variant="fullWidth"
            slotProps={{
              indicator: {
                style: {
                  backgroundColor: '#111827',
                  height: '2px',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                },
              },
            }}
            sx={{
              mb: 3,
              '& .MuiTabs-flexContainer': {
                borderBottom: 'none',
              },
            }}
          >
            <Tab
              disableRipple
              value="login"
              label="ВХОД"
              sx={{
                fontWeight: authMethod === 'login' ? '600' : '550',
                color: '#9CA3AF',
                '&.Mui-selected': {
                  color: '#111827',
                },
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#111827',
                },
              }}
            />
            <Tab
              disableRipple
              value="register"
              label="РЕГИСТРАЦИЯ"
              sx={{
                fontWeight: authMethod === 'register' ? '600' : '550',
                color: '#9CA3AF',
                '&.Mui-selected': {
                  color: '#111827',
                },
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#111827',
                },
              }}
            />
          </Tabs>

          <Box sx={{ overflow: 'hidden', position: 'relative', width: '100%' }}>
            <AnimatePresence mode="wait" initial={false}>
              <MotionBox
                key={authMethod}
                initial={{ x: authMethod === 'login' ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: authMethod === 'login' ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {authMethod === 'login' ? <LoginForm /> : <RegisterForm />}
              </MotionBox>
            </AnimatePresence>
          </Box>
        </Paper>

        <Typography
          variant="caption"
          display="block"
          align="center"
          sx={{ mt: 4, color: 'text.secondary' }}
        >
          © {new Date().getFullYear()} Eduflow. Все права защищены.
        </Typography>
      </Container>
    </Box>
  )
}

export default AuthPage
