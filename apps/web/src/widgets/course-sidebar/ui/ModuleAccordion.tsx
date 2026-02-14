import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import type { NavigationModule } from '../model'

import {
  moduleAccordionSummaryStyles,
  moduleNumberBlockStyles,
  moduleTitleStyles,
  tooltipTextSecondaryStyles,
} from './CourseSidebar.styles'
import { LessonItem } from './LessonItem'

interface ModuleAccordionProps {
  module: NavigationModule
  index: number
  courseId: string
  activeModuleId: boolean
  isMobile?: boolean
}

export const ModuleAccordion = ({
  module,
  index,
  courseId,
  activeModuleId,
}: ModuleAccordionProps) => {
  const [expanded, setExpanded] = useState(activeModuleId)

  useEffect(() => {
    setExpanded(activeModuleId)
  }, [activeModuleId])

  const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded)
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      disableGutters
      elevation={0}
      slotProps={{ transition: { unmountOnExit: true } }}
      sx={{
        '&::before': { display: 'none' },
        backgroundColor: 'transparent',
      }}
    >
      <Tooltip
        title={
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 13 }}>
              {module.title}
            </Typography>
            <Typography variant="caption" sx={tooltipTextSecondaryStyles}>
              Количество уроков: {module.lessons.length}
            </Typography>
          </Box>
        }
        placement="right"
      >
        <AccordionSummary sx={moduleAccordionSummaryStyles}>
          <Box sx={moduleNumberBlockStyles}>
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: 10, lineHeight: 1 }}>
              {index + 1}
            </Typography>
          </Box>

          <Typography variant="body2" sx={moduleTitleStyles}>
            {module.title}
          </Typography>
        </AccordionSummary>
      </Tooltip>

      <AccordionDetails sx={{ p: 0 }}>
        <List disablePadding>
          {module.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} courseId={courseId} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}
