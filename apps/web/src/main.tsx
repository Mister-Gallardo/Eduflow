import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/app/App'
import { SnackbarProvider, ThemeProvider, TrpcProvider } from '@/app/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrpcProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </TrpcProvider>
  </StrictMode>,
)
