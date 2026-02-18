import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

export const textStepStyles: SxProps<Theme> = {
  '& h1': {
    typography: 'h4',
    fontWeight: 700,
  },
  '& h2': {
    typography: 'h5',
    fontWeight: 600,
  },
  '& h3': {
    typography: 'h6',
    fontWeight: 600,
  },
  '& h4': {
    typography: 'h6',
    fontWeight: 600,
  },
  '& p': {
    typography: 'body1',
    lineHeight: 1.7,
  },
  '& ul, & ol': {
    '& li': {
      typography: 'body1',
      mb: 1,
      lineHeight: 1.7,
    },
  },
  '& code': {
    fontFamily: "'JetBrains Mono', Consolas, Monaco, monospace",
    fontSize: '0.9em',
    backgroundColor: 'rgba(44, 52, 68, 0.06)',
    color: 'customColors.indigo',
    px: 0.75,
    py: 0.25,
    borderRadius: '4px',
  },
  '& pre': {
    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.07),
    borderRadius: '8px',
    p: 2,
    mb: 2,
    overflow: 'auto',
    '& code': {
      fontFamily: "'JetBrains Mono', Consolas, Monaco, monospace",
      backgroundColor: 'transparent',
      px: 0,
      py: 0,
      fontSize: '0.9rem',
    },
  },
  '& blockquote': {
    borderLeft: '4px solid',
    borderColor: 'secondary.main',
    pl: 2,
    py: 0.5,
    my: 2,
    fontStyle: 'italic',
    color: 'text.secondary',
  },
  '& a': {
    color: 'customColors.indigo',
    textDecoration: 'underline',
    transition: 'color 0.2s',
    '&:hover': {
      color: 'primary.main',
    },
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    my: 2,
  },
  '& iframe': {
    width: '100%',
    aspectRatio: '16 / 9',
    borderRadius: '12px',
    border: 'none',
    my: 3,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  '& strong': {
    fontWeight: 600,
  },
  '& em': {
    fontStyle: 'italic',
  },
}
