import type { SxProps, Theme } from '@mui/material/styles'

export const courseListStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2.5,
  overflowX: 'auto',
  pb: 2,
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
}
