import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './app/App.tsx'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { TrpcProvider } from './app/providers/TrpcProvider.tsx'

import './global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrpcProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TrpcProvider>
  </StrictMode>,
)
