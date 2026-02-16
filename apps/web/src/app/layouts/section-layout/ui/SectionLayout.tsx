import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { PageContainer } from '@/shared/ui'
import { Header } from '@/widgets/header'

export const SectionLayout = () => {
  return (
    <>
      <Header
        containerVariant="fixed"
        leftSlot={<p>Left Slot</p>}
        centerSlot={<p>Center Slot</p>}
        rightSlot={<p>Right Slot</p>}
      />
      <Box component="main">
        <PageContainer variant="fixed">
          <Outlet />
        </PageContainer>
      </Box>
    </>
  )
}
