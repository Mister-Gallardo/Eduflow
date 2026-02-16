import type { SxProps, Theme } from '@mui/material/styles'

export const moduleAccordionSummaryStyles: SxProps<Theme> = {
  pz: 3,
  gap: 1,
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
