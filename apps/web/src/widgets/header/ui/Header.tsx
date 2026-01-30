import { AppBar, Box, Toolbar } from '@mui/material'
import type { ReactNode } from 'react'

import { PageContainer, type PageContainerVariant } from '../../../shared/ui'

interface BaseHeaderProps {
  containerVariant: PageContainerVariant
}

type HeaderSlots =
  | { leftSlot: ReactNode; centerSlot?: ReactNode; rightSlot?: ReactNode }
  | { leftSlot?: ReactNode; centerSlot: ReactNode; rightSlot?: ReactNode }
  | { leftSlot?: ReactNode; centerSlot?: ReactNode; rightSlot: ReactNode }

type AppHeaderProps = BaseHeaderProps & HeaderSlots

export const Header = ({ leftSlot, centerSlot, rightSlot, containerVariant }: AppHeaderProps) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar disableGutters>
        <PageContainer variant={containerVariant}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 64,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>{leftSlot}</Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>{centerSlot}</Box>

            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}
            >
              {rightSlot}
            </Box>
          </Box>
        </PageContainer>
      </Toolbar>
    </AppBar>
  )
}
