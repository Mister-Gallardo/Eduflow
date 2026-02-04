import CloseIcon from '@mui/icons-material/Close'
import {
  Alert,
  IconButton,
  Slide,
  type SlideProps,
  Snackbar,
  type SxProps,
  type Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { SnackbarContext, type SnackbarOptions } from '@/shared/ui'

const AUTO_HIDE_DURATION = 5000

const alertStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: { xs: 'auto', sm: '360px', md: '380px', lg: '420px' },
  display: 'flex',
  alignItems: 'center',
  '& .MuiAlert-action': { pt: 0 },
  cursor: 'pointer',
}

const Transition = React.forwardRef<
  HTMLDivElement,
  SlideProps & { onExited?: (node: HTMLElement) => void }
>(function Transition(props, ref) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Slide {...props} direction={isMobile ? 'down' : 'left'} ref={ref} onExited={props.onExited} />
  )
})

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarOptions | null>(null)
  const [open, setOpen] = useState(false)

  const closingRef = useRef(false)
  const pendingRef = useRef<SnackbarOptions | null>(null)

  const showSnackbar = useCallback(
    (options: SnackbarOptions) => {
      if (open || closingRef.current) {
        pendingRef.current = options
        if (open) {
          setOpen(false)
        }
      } else {
        setSnackbar(options)
        setOpen(true)
      }
    },
    [open],
  )

  const handleClose = useCallback((_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }, [])

  const handleExited = useCallback(() => {
    closingRef.current = false

    if (pendingRef.current) {
      setSnackbar(pendingRef.current)
      setOpen(true)
      pendingRef.current = null
    } else {
      setSnackbar(null)
    }
  }, [])

  useEffect(() => {
    if (!open && snackbar) {
      closingRef.current = true
    }
  }, [open, snackbar])

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={AUTO_HIDE_DURATION}
        slots={{ transition: Transition }}
        slotProps={{ transition: { onExited: handleExited } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {snackbar ? (
          <Alert
            severity={snackbar.severity}
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
                sx={{ ml: 1 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={alertStyles}
            onClick={handleClose}
          >
            {snackbar.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
