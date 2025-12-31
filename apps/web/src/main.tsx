import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './app/App.tsx'
import { TrpcProvider } from './app/providers/TrpcProvider.tsx'

import './global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrpcProvider>
      <CssBaseline />
      {/* <GlobalStyles
        styles={
          {
            a: { textDecoration: 'none', color: 'inherit' },
            '.my-custom-class': { borderRadius: 8 },
          }
        }
      /> */}
      <App />
    </TrpcProvider>
  </StrictMode>,
)
