import { Container } from '@mui/material'
import type { ReactNode } from 'react'

export type PageContainerVariant = 'fixed' | 'fluid' | 'narrow'

interface PageContainerProps {
  variant: PageContainerVariant
  children: ReactNode
}

export const PageContainer = ({ variant, children }: PageContainerProps) => (
  <Container
    maxWidth={false}
    sx={{
      width: '100%',
      mx: 'auto',
      maxWidth: {
        fixed: { lg: '1140px', xl: '1440px' },
        fluid: '100%',
        narrow: '900px',
      }[variant],
      px: {
        xs: 1.5,
        sm: 2.5,
        lg: 0,
      },
    }}
  >
    {children}
  </Container>
)
