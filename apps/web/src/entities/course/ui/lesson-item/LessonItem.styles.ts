import type { SxProps, Theme } from '@mui/material/styles'

export const lessonStyles: SxProps<Theme> = {
  py: 1,
  pl: 3,
  pr: 2,
  '&.Mui-selected': {
    backgroundColor: 'action.selected',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      width: 3,
      height: '60%',
      bgcolor: 'primary.main',
      borderRadius: '0 4px 4px 0',
    },
  },
}

export const lessonTitleStyles: SxProps<Theme> = {
  pl: 1.5,
  color: 'text.primary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
