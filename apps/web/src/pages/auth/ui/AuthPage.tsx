import { Box, Paper, type SxProps, type Theme } from '@mui/material'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'

import { LoginForm, RegisterForm } from '@/features/auth'
import { MotionBox } from '@/shared/ui'

import { AuthTabs } from './AuthTabs'

const paperStyles: SxProps<Theme> = {
  p: 4,
  pt: 3,
  borderRadius: 3,
  border: '1px solid #E5E7EB',
  backgroundColor: '#fff',
}

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
