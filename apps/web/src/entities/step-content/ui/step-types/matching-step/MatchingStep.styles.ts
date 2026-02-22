import { alpha, type SxProps, type Theme } from '@mui/material/styles'

import { ROW_MIN_HEIGHT } from '@/entities/step-content/lib'

export const pairsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 4, sm: 1.5 },
}

export const getPairRowStyles = (isActive: boolean, isDragOver: boolean): SxProps<Theme> => ({
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
  gridTemplateRows: { xs: 'auto', sm: 'auto' },
  alignItems: 'center',
  gap: { xs: 0.5, sm: 1.5 },
  transition: 'opacity 0.15s',
  opacity: isActive || isDragOver ? 1 : 0.95,
})

export const connectorIconStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: { xs: '0 auto', sm: 0 },
  color: (theme) => alpha(theme.palette.primary.main, 0.3),
  flexShrink: 0,
}

export const getPoolContainerStyles = (isDragOver: boolean): SxProps<Theme> => ({
  display: 'flex',
  height: '100%',
  flexWrap: 'wrap',
  gap: 1,
  p: 2,
  borderRadius: '14px',
  border: '1px solid',
  borderColor: (theme) =>
    isDragOver ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.08),
  backgroundColor: (theme) =>
    isDragOver ? alpha(theme.palette.primary.main, 0.03) : alpha(theme.palette.primary.main, 0.012),
  boxShadow: (theme) =>
    isDragOver ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}` : 'none',
  transition: 'all 0.15s',
})

export const chipPoolStyles: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  p: 2,
  borderRadius: '14px',
  border: '1px solid',
  borderColor: (theme) => alpha(theme.palette.primary.main, 0.08),
  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.012),
  minHeight: 64,
}

export const emptyPoolStyles: SxProps<Theme> = {
  width: '100%',
  height: ROW_MIN_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: (theme) => alpha(theme.palette.primary.main, 0.4),
}

export const poolLabelStyles: SxProps<Theme> = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'text.disabled',
  mb: 1,
}
