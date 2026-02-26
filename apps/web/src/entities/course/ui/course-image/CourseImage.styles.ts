import type { SxProps, Theme } from '@mui/material/styles'

type BlobVariant = 'default' | 'card'

export const courseImageStyles: SxProps<Theme> = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
}

const BLOB_PRESETS: Record<BlobVariant, { first: SxProps<Theme>; second: SxProps<Theme> }> = {
  default: {
    first: {
      position: 'absolute',
      top: '-5%',
      right: '-5%',
      width: '35%',
      height: '45%',
      borderRadius: '40%',
      background: 'rgba(255,255,255,0.12)',
      transform: 'rotate(15deg)',
      filter: 'blur(2px)',
    },
    second: {
      position: 'absolute',
      top: '5%',
      left: '5%',
      width: '30%',
      height: '40%',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.08)',
      filter: 'blur(2px)',
    },
  },
  card: {
    first: {
      position: 'absolute',
      top: '-20%',
      right: '-10%',
      width: '60%',
      height: '120%',
      borderRadius: '40%',
      background: 'rgba(255,255,255,0.12)',
      transform: 'rotate(15deg)',
      filter: 'blur(2px)',
    },
    second: {
      position: 'absolute',
      bottom: '-30%',
      left: '-10%',
      width: '50%',
      height: '100%',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.08)',
    },
  },
}

export const getBlobStyles = (variant: BlobVariant) => BLOB_PRESETS[variant]

export const illustrationStyles = (variant: BlobVariant): SxProps<Theme> =>
  variant === 'card'
    ? {
        position: 'absolute',
        right: 4,
        bottom: 0,
        width: { xs: '65%', sm: '70%', md: '75%' },
        height: 'auto',
        maxHeight: '92%',
        objectFit: 'contain',
        opacity: 1,
        zIndex: 'layoutLow',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
      }
    : {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: '75%',
        height: 'auto',
        objectFit: 'contain',
        opacity: 1,
        zIndex: 'layoutLow',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
      }
