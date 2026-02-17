import { Container } from '@mui/material'
import type { ReactNode } from 'react'

import { maxWidth, pageContainerStyles } from './PageContainer.styles'
import type { PageContainerVariant } from './types'

interface PageContainerProps {
  variant: PageContainerVariant
  children: ReactNode
}

export const PageContainer = ({ variant, children }: PageContainerProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        ...pageContainerStyles,
        maxWidth: maxWidth[variant],
      }}
    >
      {children}
    </Container>
  )
}
