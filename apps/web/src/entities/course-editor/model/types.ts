import type { CourseEditorData, StepEditorItem } from '@eduflow/shared'

/** Идентификатор текущего выбранного элемента в сайдбаре */
export interface EditorSelection {
  moduleId: string | null
  lessonId: string | null
  stepId: string | null
}

/** Состояние контекста редактора */
export interface CourseEditorState {
  courseId: string
  courseData: CourseEditorData | null
  isLoading: boolean
  isSaving: boolean
  selection: EditorSelection

  /** Выбранный шаг (derived) */
  selectedStep: StepEditorItem | null
}
