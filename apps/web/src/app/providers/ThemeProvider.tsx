import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    button: { textTransform: 'none' },
  },
  palette: {
    text: {
      primary: '#1A1A1A',
      secondary: 'rgb(113, 128, 150)',
      disabled: '#9E9E9E',
    },
    primary: {
      main: '#2C3444',
      dark: '#1f2532',
    },
  },
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
)
