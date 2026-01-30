import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { PageContainer } from '../../shared/ui'
import { Header } from '../../widgets/header'

export const WorkspaceLayout = () => {
  return (
    <>
      <Header
        containerVariant="fluid"
        leftSlot={<p>Left Slot</p>}
        centerSlot={<p>Center Slot</p>}
        rightSlot={<p>Right Slot</p>}
      />
      <Box component="main">
        <PageContainer variant="fluid">
          <Outlet />
        </PageContainer>
      </Box>
    </>
  )
}
