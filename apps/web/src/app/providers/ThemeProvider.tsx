import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/outfit/600.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    button: { textTransform: 'none' },
  },
  palette: {
    text: {
      // primary: '#1A1A1A',
      primary: '#2C3444',
      secondary: 'rgb(113, 128, 150)',
      disabled: '#9E9E9E',
    },
    primary: {
      main: '#2C3444',
      dark: '#1f2532',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
  },
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
)
