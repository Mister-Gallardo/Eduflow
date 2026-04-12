import type { DragEndEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { EditorStepType } from '@eduflow/shared'
import AddIcon from '@mui/icons-material/Add'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import ShortTextIcon from '@mui/icons-material/ShortText'
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined'
import type { SxProps, Theme } from '@mui/material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import type { ReactElement } from 'react'
import { useState } from 'react'

import { useCourseEditorContext } from '@/entities/course-editor'

import { AddStepMenu } from './add-step-menu/AddStepMenu'

// ─── Constants & Icons ───

const STEP_TYPE_ICONS: Record<string, ReactElement> = {
  TEXT: <ArticleOutlinedIcon sx={{ fontSize: 16 }} />,
  VIDEO: <OndemandVideoOutlinedIcon sx={{ fontSize: 16 }} />,
  TEST_SINGLE: <RadioButtonCheckedIcon sx={{ fontSize: 16 }} />,
  TEST_MULTIPLE: <CheckBoxOutlinedIcon sx={{ fontSize: 16 }} />,
  MATCHING: <CompareArrowsIcon sx={{ fontSize: 16 }} />,
  INPUT_TEXT: <TextFieldsOutlinedIcon sx={{ fontSize: 16 }} />,
  INPUT_NUMBER: <ShortTextIcon sx={{ fontSize: 16 }} />,
  FREE_TEXT: <QuizOutlinedIcon sx={{ fontSize: 16 }} />,
}

// ─── Editable Text Component ───

const EditableText = ({
  value,
  onSave,
  sx,
  variant = 'body2',
}: {
  value: string
  onSave: (val: string) => void
  sx?: SxProps<Theme>
  variant?: 'body2' | 'caption' | 'body1'
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)

  const handleSave = () => {
    setIsEditing(false)
    if (currentValue.trim() && currentValue !== value) {
      onSave(currentValue.trim())
    } else {
      setCurrentValue(value)
    }
  }

  if (isEditing) {
    return (
      <TextField
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave()
          if (e.key === 'Escape') {
            setCurrentValue(value)
            setIsEditing(false)
          }
        }}
        autoFocus
        variant="standard"
        size="small"
        fullWidth
        sx={{
          flex: 1,
          '& .MuiInputBase-root': { py: 0 },
          '& .MuiInputBase-input': {
            fontSize: variant === 'caption' ? 12 : variant === 'body2' ? 13 : 14,
            fontWeight: 500,
            py: 0.25,
            px: 0.5,
          },
        }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()} // Prevent DnD and Accordion toggle
      />
    )
  }

  return (
    <Typography
      variant={variant}
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        cursor: 'text',
        ...sx,
      }}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => {
        e.stopPropagation()
        setIsEditing(true)
      }}
      title="Двойной клик для переименования"
    >
      {value}
    </Typography>
  )
}

// ─── DnD Item Wrapper ───

const SortableItemWrapper = ({
  id,
  children,
  sx,
}: {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (listeners: Record<string, any> | undefined) => ReactElement
  sx?: SxProps<Theme>
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.7 : 1,
    boxShadow: isDragging ? '0px 4px 12px rgba(0,0,0,0.1)' : 'none',
  }

  return (
    <Box ref={setNodeRef} style={style} {...attributes} sx={{ position: 'relative', ...sx }}>
      {children(listeners)}
    </Box>
  )
}

// ─── Drag Handle ───

const DragHandle = ({
  listeners,
  sx,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listeners: Record<string, any> | undefined
  sx?: SxProps<Theme>
}) => {
  return (
    <IconButton
      size="small"
      {...listeners}
      sx={{
        p: 0.25,
        cursor: 'grab',
        color: 'text.disabled',
        '&:hover': { color: 'text.secondary' },
        ...sx,
      }}
      onPointerDown={(e) => {
        // Essential to allow dnd-kit to process pointer down for drag
        if (listeners?.onPointerDown) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          listeners.onPointerDown(e)
        }
      }}
    >
      <DragIndicatorIcon sx={{ fontSize: 16 }} />
    </IconButton>
  )
}

// ─── Main Component ───

export const CourseEditorSidebar = () => {
  const {
    courseData,
    isLoading,
    selectedStepId,
    selectStep,
    addModule,
    renameModule,
    deleteModule,
    reorderModules,
    addLesson,
    renameLesson,
    deleteLesson,
    reorderLessons,
    addStep,
    deleteStep,
    reorderSteps,
  } = useCourseEditorContext()

  const [addStepAnchor, setAddStepAnchor] = useState<{
    anchorEl: HTMLElement
    lessonId: string
    moduleId: string
  } | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require moving 5px before starting drag, allows clicking buttons
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id || !courseData) return

    const activeIdStr = String(active.id)
    const overIdStr = String(over.id)

    // Modules
    if (activeIdStr.startsWith('mod-') && overIdStr.startsWith('mod-')) {
      const oldIndex = courseData.modules.findIndex((m) => `mod-${m.id}` === activeIdStr)
      const newIndex = courseData.modules.findIndex((m) => `mod-${m.id}` === overIdStr)
      if (oldIndex !== -1 && newIndex !== -1) {
        const ordered = arrayMove(courseData.modules, oldIndex, newIndex).map((m) => m.id)
        void reorderModules(ordered)
      }
      return
    }

    // Lessons (only reorder within the SAME module)
    if (activeIdStr.startsWith('les-') && overIdStr.startsWith('les-')) {
      for (const mod of courseData.modules) {
        const oldIndex = mod.lessons.findIndex((l) => `les-${l.id}` === activeIdStr)
        const newIndex = mod.lessons.findIndex((l) => `les-${l.id}` === overIdStr)
        if (oldIndex !== -1 && newIndex !== -1) {
          const ordered = arrayMove(mod.lessons, oldIndex, newIndex).map((l) => l.id)
          void reorderLessons(mod.id, ordered)
          break
        }
      }
      return
    }

    // Steps (only reorder within the SAME lesson)
    if (activeIdStr.startsWith('stp-') && overIdStr.startsWith('stp-')) {
      for (const mod of courseData.modules) {
        for (const lesson of mod.lessons) {
          const oldIndex = lesson.steps.findIndex((s) => `stp-${s.id}` === activeIdStr)
          const newIndex = lesson.steps.findIndex((s) => `stp-${s.id}` === overIdStr)
          if (oldIndex !== -1 && newIndex !== -1) {
            const ordered = arrayMove(lesson.steps, oldIndex, newIndex).map((s) => s.id)
            void reorderSteps(lesson.id, ordered)
            break
          }
        }
      }
    }
  }

  const handleAddModule = async () => {
    const num = (courseData?.modules.length ?? 0) + 1
    await addModule(`Модуль ${num}`)
  }

  const handleAddLesson = async (moduleId: string, existingCount: number) => {
    await addLesson(moduleId, `Урок ${existingCount + 1}`)
  }

  const handleAddStepClick = (
    event: React.MouseEvent<HTMLElement>,
    lessonId: string,
    moduleId: string,
  ) => {
    setAddStepAnchor({ anchorEl: event.currentTarget, lessonId, moduleId })
  }

  const handleStepTypeSelected = async (type: EditorStepType, title: string) => {
    if (!addStepAnchor) return
    await addStep(addStepAnchor.lessonId, title, type)
    setAddStepAnchor(null)
  }

  const totalModules = courseData?.modules.length ?? 0
  const totalSteps =
    courseData?.modules.reduce(
      (acc, m) => acc + m.lessons.reduce((a, l) => a + l.steps.length, 0),
      0,
    ) ?? 0

  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Загрузка...
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 14 }}>
          Структура курса
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {totalModules} модулей · {totalSteps} шагов
        </Typography>

        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          onClick={handleAddModule}
          sx={{
            mt: 1.5,
            width: '100%',
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 2,
            py: 0.75,
          }}
        >
          Модуль
        </Button>
      </Box>

      {/* Tree */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'divider',
            borderRadius: 2,
          },
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={courseData?.modules.map((m) => `mod-${m.id}`) ?? []}
            strategy={verticalListSortingStrategy}
          >
            {courseData?.modules.map((mod, modIdx) => (
              <SortableItemWrapper key={mod.id} id={`mod-${mod.id}`} sx={{ mb: 0.5 }}>
                {(modListeners) => (
                  <Accordion
                    defaultExpanded
                    disableGutters
                    elevation={0}
                    sx={{
                      '&:before': { display: 'none' },
                      '& .MuiAccordionSummary-root': {
                        minHeight: 40,
                        px: 2,
                        py: 0,
                      },
                      '& .MuiAccordionSummary-content': {
                        my: 0.5,
                      },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <DragHandle listeners={modListeners} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            fontSize: 12,
                            letterSpacing: '0.03em',
                            color: 'text.secondary',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {modIdx + 1}.
                        </Typography>

                        <EditableText
                          value={mod.title}
                          onSave={(val) => void renameModule(mod.id, val)}
                          sx={{ fontWeight: 600, fontSize: 13 }}
                        />

                        <Tooltip title="Удалить модуль">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              void deleteModule(mod.id)
                            }}
                            sx={{ flexShrink: 0, color: 'text.disabled', p: 0.5 }}
                          >
                            <DeleteOutlineIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails sx={{ px: 1, pt: 0, pb: 1 }}>
                      <SortableContext
                        items={mod.lessons.map((l) => `les-${l.id}`)}
                        strategy={verticalListSortingStrategy}
                      >
                        {mod.lessons.map((lesson, lessonIdx) => (
                          <SortableItemWrapper key={lesson.id} id={`les-${lesson.id}`}>
                            {(lessListeners) => (
                              <Box sx={{ mb: 0.5 }}>
                                {/* Lesson header */}
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    px: 0.5,
                                    py: 0.5,
                                    borderRadius: 1.5,
                                    '&:hover .lesson-actions': { opacity: 1 },
                                  }}
                                >
                                  <DragHandle listeners={lessListeners} />
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 600,
                                      fontSize: 11,
                                      color: 'text.secondary',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {modIdx + 1}.{lessonIdx + 1}
                                  </Typography>

                                  <EditableText
                                    value={lesson.title}
                                    onSave={(val) => void renameLesson(lesson.id, val)}
                                    sx={{ fontWeight: 500, fontSize: 12 }}
                                    variant="body2"
                                  />

                                  <Box
                                    className="lesson-actions"
                                    sx={{
                                      display: 'flex',
                                      opacity: 0,
                                      transition: 'opacity 0.15s',
                                    }}
                                  >
                                    <Tooltip title="Удалить урок">
                                      <IconButton
                                        size="small"
                                        onClick={() => void deleteLesson(lesson.id)}
                                        sx={{ p: 0.25, color: 'text.disabled' }}
                                      >
                                        <DeleteOutlineIcon sx={{ fontSize: 14 }} />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </Box>

                                {/* Steps */}
                                <SortableContext
                                  items={lesson.steps.map((s) => `stp-${s.id}`)}
                                  strategy={verticalListSortingStrategy}
                                >
                                  {lesson.steps.map((step) => (
                                    <SortableItemWrapper key={step.id} id={`stp-${step.id}`}>
                                      {(stepListeners) => (
                                        <Box
                                          onClick={() => selectStep(mod.id, lesson.id, step.id)}
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            px: 0.5,
                                            py: 0.5,
                                            ml: 2,
                                            borderRadius: 1.5,
                                            cursor: 'pointer',
                                            transition: 'all 0.1s',
                                            backgroundColor:
                                              selectedStepId === step.id
                                                ? 'primary.main'
                                                : 'transparent',
                                            color:
                                              selectedStepId === step.id ? '#fff' : 'text.primary',
                                            '&:hover': {
                                              backgroundColor:
                                                selectedStepId === step.id
                                                  ? 'primary.main'
                                                  : 'action.hover',
                                            },
                                            '&:hover .step-actions, &:hover .step-drag': {
                                              opacity: 1,
                                            },
                                          }}
                                        >
                                          <Box
                                            className="step-drag"
                                            sx={{ opacity: selectedStepId === step.id ? 1 : 0 }}
                                          >
                                            <DragHandle
                                              listeners={stepListeners}
                                              sx={{
                                                color:
                                                  selectedStepId === step.id
                                                    ? 'rgba(255,255,255,0.7)'
                                                    : 'inherit',
                                                '&:hover': {
                                                  color:
                                                    selectedStepId === step.id ? '#fff' : 'inherit',
                                                },
                                              }}
                                            />
                                          </Box>

                                          <Box
                                            sx={{
                                              flexShrink: 0,
                                              color:
                                                selectedStepId === step.id
                                                  ? 'rgba(255,255,255,0.7)'
                                                  : 'text.disabled',
                                            }}
                                          >
                                            {STEP_TYPE_ICONS[step.type] ?? (
                                              <ArticleOutlinedIcon sx={{ fontSize: 16 }} />
                                            )}
                                          </Box>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              fontSize: 12,
                                              fontWeight: selectedStepId === step.id ? 600 : 400,
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap',
                                              flex: 1,
                                              color: 'inherit',
                                            }}
                                            title="Двойной клик для переименования"
                                          >
                                            {step.title}
                                          </Typography>
                                          <Box
                                            className="step-actions"
                                            sx={{
                                              display: 'flex',
                                              opacity: 0,
                                              transition: 'opacity 0.15s',
                                            }}
                                          >
                                            <Tooltip title="Удалить шаг">
                                              <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  void deleteStep(step.id)
                                                }}
                                                sx={{
                                                  p: 0.25,
                                                  color:
                                                    selectedStepId === step.id
                                                      ? 'rgba(255,255,255,0.6)'
                                                      : 'text.disabled',
                                                }}
                                              >
                                                <DeleteOutlineIcon sx={{ fontSize: 14 }} />
                                              </IconButton>
                                            </Tooltip>
                                          </Box>
                                        </Box>
                                      )}
                                    </SortableItemWrapper>
                                  ))}
                                </SortableContext>

                                {/* Add step */}
                                <Box
                                  component="button"
                                  onClick={(e) => handleAddStepClick(e, lesson.id, mod.id)}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    ml: 3,
                                    mt: 0.5,
                                    px: 1,
                                    py: 0.25,
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    color: 'text.disabled',
                                    fontSize: 11,
                                    fontWeight: 500,
                                    borderRadius: 1,
                                    transition: 'all 0.15s',
                                    '&:hover': {
                                      color: 'primary.main',
                                      backgroundColor: 'action.hover',
                                    },
                                  }}
                                >
                                  <AddIcon sx={{ fontSize: 14 }} />
                                  Добавить шаг
                                </Box>
                              </Box>
                            )}
                          </SortableItemWrapper>
                        ))}
                      </SortableContext>

                      {/* Add lesson */}
                      <Box
                        component="button"
                        onClick={() => void handleAddLesson(mod.id, mod.lessons.length)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mt: 1,
                          ml: 2,
                          px: 1,
                          py: 0.5,
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: 'text.disabled',
                          fontSize: 12,
                          fontWeight: 500,
                          borderRadius: 1,
                          transition: 'all 0.15s',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <AddIcon sx={{ fontSize: 14 }} />
                        Добавить урок
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}
              </SortableItemWrapper>
            ))}
          </SortableContext>
        </DndContext>
      </Box>

      {/* Add Step Menu */}
      <AddStepMenu
        anchorEl={addStepAnchor?.anchorEl ?? null}
        open={!!addStepAnchor}
        onClose={() => setAddStepAnchor(null)}
        onSelectType={handleStepTypeSelected}
      />
    </Box>
  )
}
