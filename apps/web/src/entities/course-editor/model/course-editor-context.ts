import type { CourseEditorData, EditorStepType, StepEditorItem } from '@eduflow/shared'
import { createContext, use } from 'react'

export interface CourseEditorContextValue {
  // ─── State ───
  courseId: string
  courseData: CourseEditorData | null
  isLoading: boolean
  isSaving: boolean

  // ─── Selection ───
  selectedModuleId: string | null
  selectedLessonId: string | null
  selectedStepId: string | null
  selectedStep: StepEditorItem | null

  // ─── Selection Actions ───
  selectStep: (moduleId: string, lessonId: string, stepId: string) => void

  // ─── Module Actions ───
  addModule: (title: string) => Promise<void>
  renameModule: (moduleId: string, title: string) => Promise<void>
  deleteModule: (moduleId: string) => Promise<void>
  reorderModules: (orderedIds: string[]) => Promise<void>

  // ─── Lesson Actions ───
  addLesson: (moduleId: string, title: string) => Promise<void>
  renameLesson: (lessonId: string, title: string) => Promise<void>
  deleteLesson: (lessonId: string) => Promise<void>
  reorderLessons: (moduleId: string, orderedIds: string[]) => Promise<void>

  // ─── Step Actions ───
  addStep: (lessonId: string, title: string, type: EditorStepType) => Promise<void>
  updateStep: (
    stepId: string,
    data: { title?: string; content?: Record<string, unknown> },
  ) => Promise<void>
  deleteStep: (stepId: string) => Promise<void>
  reorderSteps: (lessonId: string, orderedIds: string[]) => Promise<void>

  // ─── Save ───
  save: () => Promise<void>
}

export const CourseEditorContext = createContext<CourseEditorContextValue | undefined>(undefined)

export const useCourseEditorContext = () => {
  const ctx = use(CourseEditorContext)

  if (!ctx) {
    throw new Error('useCourseEditorContext must be used within CourseEditorProvider')
  }

  return ctx
}
