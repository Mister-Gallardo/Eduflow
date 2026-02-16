import { Box, Paper } from '@mui/material'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'

import { AuthTabs, LoginForm, RegisterForm } from '@/features/auth'
import { MotionBox } from '@/shared/ui'

import { paperStyles } from './AuthPage.styles'

export const AuthPage = () => {
  const [authMethod, setAuthMethod] = useState<'login' | 'register'>('login')

  return (
    <Paper elevation={0} sx={paperStyles}>
      <AuthTabs authMethod={authMethod} setAuthMethod={setAuthMethod} />

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
