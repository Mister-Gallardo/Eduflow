import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import '@/shared/ui/styles/fonts.css'

const BRAND_PRIMARY = '#2C3444'
const BRAND_LIGHT = '#58667E'
const BRAND_DARK = '#1f2532'
const BRAND_ACCENT = '#FFB900'
const BRAND_ACCENT_DARK = '#e5a600'

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      red: string
      green: string
      orange: string
      indigo: string
    }
  }

  interface PaletteOptions {
    customColors?: {
      red?: string
      green?: string
      orange?: string
      indigo?: string
    }
  }

  interface ZIndex {
    background: number
    layoutLow: number
    layoutMedium: number
    layoutHigh: number
  }

  interface Theme {
    layout: {
      headerHeight: {
        mobile: number
        desktop: number
      }
    }
  }
  interface ThemeOptions {
    layout?: {
      headerHeight?: {
        mobile?: number
        desktop?: number
      }
    }
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: BRAND_PRIMARY,
      light: BRAND_LIGHT,
      dark: BRAND_DARK,
    },
    secondary: {
      main: BRAND_ACCENT,
      dark: BRAND_ACCENT_DARK,
    },
    customColors: {
      red: '#fb2c37',
      green: '#00bd7d',
      orange: '#FFB900',
      indigo: '#2C66FF',
    },
    text: {
      primary: BRAND_PRIMARY,
      secondary: BRAND_LIGHT,
    },
  },
  layout: {
    headerHeight: {
      mobile: 57,
      desktop: 61,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },

        body: {
          WebkitTapHighlightColor: 'transparent',
          fontFamily: 'Inter, sans-serif',
        },

        'button, a, [role="button"], input, textarea, select, p, span, div': {
          WebkitTapHighlightColor: 'transparent',
          fontFamily: 'Inter, sans-serif',
        },

        a: { textDecoration: 'none', color: 'inherit' },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root:not(.MuiInputLabel-shrink) + .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline legend':
            {
              width: 0,
              maxWidth: 0,
            },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 20px',
          transition: 'all 0.2s',
        },
        containedPrimary: {
          backgroundColor: BRAND_PRIMARY,
          boxShadow: '0px 12px 20px rgba(44, 52, 68, 0.1)',
          '&:hover': {
            backgroundColor: BRAND_DARK,
            boxShadow: '0 16px 24px rgba(44, 52, 68, 0.15)',
          },
        },
        outlinedPrimary: {
          borderColor: BRAND_PRIMARY,
          color: BRAND_PRIMARY,
          boxShadow: '0 8px 16px rgba(44, 52, 68, 0.06)',
          '&:hover': {
            backgroundColor: 'rgba(44, 52, 68, 0.04)',
            borderColor: BRAND_DARK,
            boxShadow: '0 12px 20px rgba(44, 52, 68, 0.08)',
          },
        },
        containedSecondary: {
          backgroundColor: BRAND_ACCENT,
          color: '#fff',
          '&:hover': {
            backgroundColor: BRAND_ACCENT_DARK,
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        enterDelay: 0,
      },
      styleOverrides: {
        tooltip: {
          maxWidth: 340,
          backgroundColor: BRAND_PRIMARY,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: 12,
          fontWeight: 500,
          borderRadius: 6,
        },
        arrow: {
          color: BRAND_PRIMARY,
        },
      },
    },
  },
  zIndex: {
    background: -1,
    layoutLow: 1,
    layoutMedium: 5,
    layoutHigh: 10,

    mobileStepper: 1000,
    fab: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
)
