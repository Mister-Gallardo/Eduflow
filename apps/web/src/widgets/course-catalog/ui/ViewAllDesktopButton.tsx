import { alpha, Button, Skeleton, useTheme } from '@mui/material'

import { useIsMobile } from '@/shared/lib'

import { viewAllDesktopButtonStyles } from './CourseCatalog.styles'

interface ViewAllDesktopButtonProps {
  length: number
  isLoading: boolean
}

export const ViewAllDesktopButton = ({ length, isLoading }: ViewAllDesktopButtonProps) => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  return (
    <>
      {isLoading
        ? !isMobile && (
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                alignSelf: 'center',
                width: 250,
                height: 60,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }}
            />
          )
        : !isMobile &&
          length > 0 && (
            <Button variant="outlined" sx={viewAllDesktopButtonStyles}>
              Смотреть все курсы
            </Button>
          )}
    </>
  )
}
