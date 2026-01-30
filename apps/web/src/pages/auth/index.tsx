import { Box, Paper, Tab, Tabs } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { LoginForm, RegisterForm } from '../../features/auth'

const MotionBox = motion.create(Box)

export const AuthPage = () => {
  const [authMethod, setAuthMethod] = useState<'login' | 'register'>('login')

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        pt: 3,
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
          aria-label="ВХОД"
          sx={{
            fontWeight: authMethod === 'login' ? '600' : '500',
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
          aria-label="РЕГИСТРАЦИЯ"
          sx={{
            fontWeight: authMethod === 'register' ? '600' : '500',
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
  )
}

export default AuthPage
