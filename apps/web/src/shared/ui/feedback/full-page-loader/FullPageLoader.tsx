import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import { Logo } from '../../data-display/logo'

import { fullPageLoaderStyles } from './FullPageLoader.styles'

export const FullPageLoader = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <Box sx={fullPageLoaderStyles}>
      <Logo size="large" isAnimated={true} showText={false} />
    </Box>
  )
}
