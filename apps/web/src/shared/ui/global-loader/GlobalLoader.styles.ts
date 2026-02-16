import type { SxProps, Theme } from '@mui/material/styles'

export const globalLoaderStyles: SxProps<Theme> = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: (theme) => theme.zIndex.tooltip + 1,
  height: '3px',
  width: '100%',
  pointerEvents: 'none',
}
