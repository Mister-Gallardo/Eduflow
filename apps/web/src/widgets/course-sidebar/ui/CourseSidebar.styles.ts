import type { SxProps } from '@mui/material'
import type { Theme } from '@mui/material/styles'

export const sidebarStyles: SxProps<Theme> = {
  pt: 2,
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}

export const tooltipTextSecondaryStyles: SxProps<Theme> = {
  display: 'block',
  mt: 0.5,
  color: 'text.secondary',
  fontSize: 12,
  fontWeight: 500,
}

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

export const moduleAccordionSummaryStyles: SxProps<Theme> = {
  px: 3,
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    gap: 1.5,
    overflow: 'hidden',
  },
  '&:hover': {
    backgroundColor: 'action.hover',
  },
  transition: 'background-color 0.2s',
}

export const moduleNumberBlockStyles: SxProps<Theme> = {
  width: 18,
  height: 18,
  borderRadius: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'primary.main',
  color: '#fff',
}

export const moduleTitleStyles: SxProps<Theme> = {
  fontWeight: 600,
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: 1,
}

export const sidebarContentListStyles: SxProps<Theme> = {
  flex: 1,
  minHeight: 0, // Important for flex scrolling
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '5px',
    transition: 'all 0.2s',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparrent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 999,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
  },
}
