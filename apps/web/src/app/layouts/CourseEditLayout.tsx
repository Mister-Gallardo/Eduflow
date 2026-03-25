import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { CourseEditorContext, useCourseEditor } from '@/entities/course-editor'
import { AuthorNavButton } from '@/features/course-author-navigation'
import { paths } from '@/shared/config/paths'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { PageContainer } from '@/shared/ui/layout/page-container'
import { CourseEditorSidebar } from '@/widgets/course-editor-sidebar'
import { Header, HeaderActions } from '@/widgets/header'
import { StepEditorBody } from '@/widgets/step-editor-body'

export const CourseEditLayout = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const { courseId = '' } = useParams()

  const editor = useCourseEditor(courseId)

  return (
    <CourseEditorContext.Provider value={editor}>
      <Header
        leftSlot={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              component={Link}
              to={paths.teach()}
              size="small"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: 'text.secondary',
                minWidth: 'fit-content',
                fontWeight: 500,
                fontSize: 13,
                px: 1,
                '& .MuiButton-icon': { mr: isMobile ? 0 : 1 },
              }}
            >
              {!isMobile && 'Назад'}
            </Button>

            <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center' }} />

            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: { xs: 120, sm: 300 },
              }}
            >
              {editor.courseData?.title ?? 'Загрузка...'}
            </Typography>
          </Box>
        }
        rightSlot={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveOutlinedIcon sx={{ fontSize: 18 }} />}
              onClick={() => void editor.save()}
              disabled={editor.isSaving}
              sx={{
                px: 2.5,
                py: 0.75,
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Сохранить
            </Button>

            <HeaderActions
              edgeToEnd={false}
              showNotificationButton={false}
              showAccountButton={true}
            />
          </Box>
        }
        containerVariant="fluid"
      />

      <Box
        sx={{
          display: 'flex',
          height: {
            xs: `calc(100dvh - ${theme.layout.headerHeight.mobile}px)`,
            md: `calc(100vh - ${theme.layout.headerHeight.desktop}px)`,
          },
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Sidebar */}
        {!isMobile && (
          <Box
            sx={{
              width: 280,
              flexShrink: 0,
              borderRight: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
            }}
          >
            <CourseEditorSidebar />
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <PageContainer variant="narrow">
            <StepEditorBody />
          </PageContainer>
        </Box>

        {/* Author Nav Button */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            right: { xs: 12, sm: 24 },
            zIndex: theme.zIndex.layoutHigh,
          }}
        >
          <AuthorNavButton
            courseId={courseId}
            courseTitle={editor.courseData?.title ?? ''}
            activeItem="edit"
          />
        </Box>
      </Box>
    </CourseEditorContext.Provider>
  )
}
