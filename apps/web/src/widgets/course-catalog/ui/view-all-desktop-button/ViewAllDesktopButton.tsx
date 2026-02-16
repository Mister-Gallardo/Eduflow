import { Button } from '@mui/material'

import { useIsMobile } from '@/shared/lib'
import { AppSkeleton } from '@/shared/ui'

import { viewAllDesktopButtonStyles } from './ViewAllDesktopButton.styles'

interface ViewAllDesktopButtonProps {
  length: number
  isLoading: boolean
}

export const ViewAllDesktopButton = ({ length, isLoading }: ViewAllDesktopButtonProps) => {
  const isMobile = useIsMobile()

  return (
    <>
      {isLoading
        ? !isMobile && (
            <AppSkeleton
              variant="rounded"
              sx={{
                alignSelf: 'center',
                width: 250,
                height: 60,
                borderRadius: 4,
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
