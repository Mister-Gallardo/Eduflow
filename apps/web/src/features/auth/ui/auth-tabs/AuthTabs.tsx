import { Tab, Tabs } from '@mui/material'

import { tabStyles } from './AuthTabs.styles'

export const AuthTabs = ({
  authMethod,
  setAuthMethod,
}: {
  authMethod: 'login' | 'register'
  setAuthMethod: (method: 'login' | 'register') => void
}) => (
  <Tabs
    value={authMethod}
    onChange={(_, newValue) => setAuthMethod(newValue as 'login' | 'register')}
    variant="fullWidth"
    slotProps={{
      indicator: {
        style: {
          backgroundColor: 'primary.main',
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
        ...tabStyles,
        fontWeight: authMethod === 'login' ? '600' : '500',
      }}
    />
    <Tab
      disableRipple
      value="register"
      label="РЕГИСТРАЦИЯ"
      aria-label="РЕГИСТРАЦИЯ"
      sx={{
        ...tabStyles,
        fontWeight: authMethod === 'register' ? '600' : '500',
      }}
    />
  </Tabs>
)
