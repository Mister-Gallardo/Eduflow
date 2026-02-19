import type { SxProps, Theme } from '@mui/material/styles'
import { darken } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

const CODE_FONT_FAMILY = "'JetBrains Mono', Consolas, Monaco, monospace"
const LINE_HEIGHT = 1.6

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
    typography: 'subtitle1',
    fontWeight: 600,
  },
  '& h5': {
    typography: 'subtitle2',
    fontWeight: 600,
  },
  '& h6': {
    typography: 'subtitle3',
    fontWeight: 600,
  },
  '& p': {
    typography: 'body1',
    lineHeight: LINE_HEIGHT,
  },
  '& ul, & ol': {
    '& li': {
      typography: 'body1',
      mb: 1,
      lineHeight: LINE_HEIGHT,
    },
  },
  '& code': {
    fontFamily: CODE_FONT_FAMILY,
    fontSize: 14,
    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
    color: (theme) => theme.palette.primary.main,
    px: 0.75,
    py: 0.25,
    borderRadius: '4px',
    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  '& pre': {
    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
    borderRadius: '8px',
    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
    p: 2,
    mb: 2,
    overflow: 'auto',
    '& code': {
      fontFamily: CODE_FONT_FAMILY,
      backgroundColor: 'transparent',
      p: 0,
      border: 'none',
      color: (theme) => theme.palette.primary.main,
      fontSize: 14,
    },
  },
  '& blockquote': {
    borderLeft: '4px solid',
    borderColor: (theme) => theme.palette.secondary.main,
    pl: 2,
    py: 0.5,
    my: 2,
    fontStyle: 'italic',
    color: (theme) => theme.palette.text.secondary,
  },
  '& a': {
    color: (theme) => theme.palette.customColors.indigo,
    textDecoration: 'underline',
    textDecorationColor: (theme) => alpha(theme.palette.customColors.indigo, 0.2),
    textUnderlineOffset: '4px',
    transition: 'color 0.2s',
    '&:hover': {
      color: (theme) => darken(theme.palette.customColors.indigo, 0.2),
      textDecorationColor: (theme) => darken(theme.palette.customColors.indigo, 0.2),
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
    boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  '& strong': {
    fontWeight: 600,
  },
  '& em': {
    fontStyle: 'italic',
  },
}
