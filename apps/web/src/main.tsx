import { CssBaseline, GlobalStyles } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './example.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <GlobalStyles
      styles={
        {
          // a: { textDecoration: 'none', color: 'inherit' },
          // '.my-custom-class': { borderRadius: 8 },
        }
      }
    />
    <App />
  </StrictMode>,
)
