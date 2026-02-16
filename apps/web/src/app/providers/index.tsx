import { SnackbarProvider } from './snackbar-provider'
import { ThemeProvider } from './theme-provider'
import { TrpcProvider } from './trpc-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <TrpcProvider>
    <ThemeProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  </TrpcProvider>
)
