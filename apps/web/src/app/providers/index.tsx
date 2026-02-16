import { SnackbarProvider } from './SnackbarProvider'
import { ThemeProvider } from './ThemeProvider'
import { TrpcProvider } from './TrpcProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <TrpcProvider>
    <ThemeProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  </TrpcProvider>
)
