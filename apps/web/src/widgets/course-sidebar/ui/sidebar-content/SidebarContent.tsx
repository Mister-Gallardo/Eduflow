import { Box, Typography } from '@mui/material'

import { ModuleAccordion, useSidebarContext } from '@/entities/course-navigation'
import { AppSkeleton } from '@/shared/ui/feedback/app-skeleton'

import { sidebarContentListStyles } from './SidebarContent.styles'

export const SidebarContent = () => {
  const { navigation, courseTitle, isLoading } = useSidebarContext()

  return (
    <>
      <Typography
        sx={{
          px: 3,
          mb: 2,
          fontWeight: 700,
          overflowWrap: 'break-word',
        }}
      >
        {courseTitle}
      </Typography>

      <Box sx={sidebarContentListStyles}>
        {isLoading ? (
          <Box sx={{ px: 3 }}>
            <AppSkeleton sx={{ width: '85%', height: 48, mb: 1 }} />
            {Array.from({ length: 6 }).map((_, i) => (
              <AppSkeleton key={i} sx={{ height: 40, mb: 1 }} />
            ))}
          </Box>
        ) : (
          <>
            {navigation.map((module, index) => (
              <ModuleAccordion key={module.id} module={module} index={index} />
            ))}
          </>
        )}
      </Box>
    </>
  )
}
