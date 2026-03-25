import type { EditorStepType, StepEditorItem } from '@eduflow/shared'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { trpc } from '@/shared/api/trpc'
import { messages } from '@/shared/config/messages'
import { useSnackbar } from '@/shared/ui/feedback/snackbar'

import type { CourseEditorContextValue } from './course-editor-context'

/**
 * Хук — провайдер состояния для редактора курсов.
 * Загружает полное дерево курса, предоставляет CRUD-операции,
 * все мутации мгновенно обновляют кэш через invalidation.
 */
export const useCourseEditor = (courseId: string): CourseEditorContextValue => {
  const showSnackbar = useSnackbar()
  const utils = trpc.useUtils()

  // ─── Selection ───
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)
  const [didAutoSelect, setDidAutoSelect] = useState(false)

  // ─── Query ───
  const { data: courseData = null, isLoading } = trpc.teach.editor.getCourse.useQuery(
    { courseId },
    { enabled: !!courseId },
  )

  // ─── Derived: selected step ───
  const selectedStep = useMemo<StepEditorItem | null>(() => {
    if (!courseData || !selectedStepId) return null

    for (const mod of courseData.modules) {
      for (const lesson of mod.lessons) {
        const step = lesson.steps.find((s) => s.id === selectedStepId)
        if (step) return step
      }
    }

    return null
  }, [courseData, selectedStepId])

  // ─── Auto-select first step when data loads ───
  useEffect(() => {
    if (!courseData || didAutoSelect || selectedStepId) return

    const firstModule = courseData.modules[0]
    const firstLesson = firstModule?.lessons[0]
    const firstStep = firstLesson?.steps[0]

    if (firstModule && firstLesson && firstStep) {
      setDidAutoSelect(true)
      setSelectedModuleId(firstModule.id)
      setSelectedLessonId(firstLesson.id)
      setSelectedStepId(firstStep.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseData])

  // ─── Helpers ───
  const invalidate = useCallback(() => {
    void utils.teach.editor.getCourse.invalidate({ courseId })
  }, [utils, courseId])

  const onError = useCallback(() => {
    showSnackbar({ message: messages.genericError, severity: 'error' })
  }, [showSnackbar])

  // ─── Selection ───
  const selectStep = useCallback((moduleId: string, lessonId: string, stepId: string) => {
    setSelectedModuleId(moduleId)
    setSelectedLessonId(lessonId)
    setSelectedStepId(stepId)
  }, [])

  // ─── Module Mutations ───
  const createModuleMut = trpc.teach.editor.createModule.useMutation({
    onSuccess: invalidate,
    onError,
  })
  const updateModuleMut = trpc.teach.editor.updateModule.useMutation({
    onSuccess: invalidate,
    onError,
  })
  const deleteModuleMut = trpc.teach.editor.deleteModule.useMutation({
    onSuccess: (_, variables) => {
      if (selectedModuleId === variables.moduleId) {
        setSelectedModuleId(null)
        setSelectedLessonId(null)
        setSelectedStepId(null)
      }
      invalidate()
    },
    onError,
  })
  const reorderModulesMut = trpc.teach.editor.reorderModules.useMutation({
    onSuccess: invalidate,
    onError,
  })

  // ─── Lesson Mutations ───
  const createLessonMut = trpc.teach.editor.createLesson.useMutation({
    onSuccess: invalidate,
    onError,
  })
  const updateLessonMut = trpc.teach.editor.updateLesson.useMutation({
    onSuccess: invalidate,
    onError,
  })
  const deleteLessonMut = trpc.teach.editor.deleteLesson.useMutation({
    onSuccess: (_, variables) => {
      if (selectedLessonId === variables.lessonId) {
        setSelectedLessonId(null)
        setSelectedStepId(null)
      }
      invalidate()
    },
    onError,
  })
  const reorderLessonsMut = trpc.teach.editor.reorderLessons.useMutation({
    onSuccess: invalidate,
    onError,
  })

  // ─── Step Mutations ───
  const createStepMut = trpc.teach.editor.createStep.useMutation({
    onSuccess: invalidate,
    onError,
  })
  const updateStepMut = trpc.teach.editor.updateStep.useMutation({
    onSuccess: invalidate,
    onError,
  })
  const deleteStepMut = trpc.teach.editor.deleteStep.useMutation({
    onSuccess: (_, variables) => {
      if (selectedStepId === variables.stepId) {
        setSelectedStepId(null)
      }
      invalidate()
    },
    onError,
  })
  const reorderStepsMut = trpc.teach.editor.reorderSteps.useMutation({
    onSuccess: invalidate,
    onError,
  })

  // ─── Module Actions ───
  const addModule = useCallback(
    async (title: string) => {
      await createModuleMut.mutateAsync({ courseId, title })
    },
    [createModuleMut, courseId],
  )

  const renameModule = useCallback(
    async (moduleId: string, title: string) => {
      await updateModuleMut.mutateAsync({ moduleId, title })
    },
    [updateModuleMut],
  )

  const deleteModule = useCallback(
    async (moduleId: string) => {
      await deleteModuleMut.mutateAsync({ moduleId })
    },
    [deleteModuleMut],
  )

  const reorderModules = useCallback(
    async (orderedIds: string[]) => {
      await reorderModulesMut.mutateAsync({ courseId, orderedIds })
    },
    [reorderModulesMut, courseId],
  )

  const addLesson = useCallback(
    async (moduleId: string, title: string) => {
      await createLessonMut.mutateAsync({ moduleId, title })
    },
    [createLessonMut],
  )

  const renameLesson = useCallback(
    async (lessonId: string, title: string) => {
      await updateLessonMut.mutateAsync({ lessonId, title })
    },
    [updateLessonMut],
  )

  const deleteLesson = useCallback(
    async (lessonId: string) => {
      await deleteLessonMut.mutateAsync({ lessonId })
    },
    [deleteLessonMut],
  )

  const reorderLessons = useCallback(
    async (moduleId: string, orderedIds: string[]) => {
      await reorderLessonsMut.mutateAsync({ moduleId, orderedIds })
    },
    [reorderLessonsMut],
  )

  // ─── Step Actions ───
  const addStep = useCallback(
    async (lessonId: string, title: string, type: EditorStepType) => {
      await createStepMut.mutateAsync({ lessonId, title, type })
    },
    [createStepMut],
  )

  const updateStep = useCallback(
    async (stepId: string, data: { title?: string; content?: Record<string, unknown> }) => {
      await updateStepMut.mutateAsync({ stepId, ...data })
    },
    [updateStepMut],
  )

  const deleteStep = useCallback(
    async (stepId: string) => {
      await deleteStepMut.mutateAsync({ stepId })
    },
    [deleteStepMut],
  )

  const reorderSteps = useCallback(
    async (lessonId: string, orderedIds: string[]) => {
      await reorderStepsMut.mutateAsync({ lessonId, orderedIds })
    },
    [reorderStepsMut],
  )

  // ─── Save (no-op for now — all mutations are immediate) ───
  const isSaving =
    updateStepMut.isPending ||
    createModuleMut.isPending ||
    createLessonMut.isPending ||
    createStepMut.isPending

  const save = useCallback(async () => {
    if (!courseData) return

    if (courseData.modules.length === 0) {
      showSnackbar({ message: 'Курс не может быть пустым.', severity: 'error' })
      return
    }

    for (const mod of courseData.modules) {
      if (mod.lessons.length === 0) {
        showSnackbar({ message: `Модуль "${mod.title}" пуст. Добавьте уроки.`, severity: 'error' })
        return
      }
      for (const lesson of mod.lessons) {
        if (lesson.steps.length === 0) {
          showSnackbar({
            message: `Урок "${lesson.title}" пуст. Добавьте шаги.`,
            severity: 'error',
          })
          return
        }
      }
    }

    await Promise.resolve()
    showSnackbar({ message: 'Курс сохранён и готов к публикации!', severity: 'success' })
  }, [courseData, showSnackbar])

  return {
    courseId,
    courseData,
    isLoading,
    isSaving,
    selectedModuleId,
    selectedLessonId,
    selectedStepId,
    selectedStep,
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
    updateStep,
    deleteStep,
    reorderSteps,
    save,
  }
}
