import type { NavigationLesson, NavigationModule } from '@/entities/course'

export const findActiveLessonId = (
  modules: NavigationModule[],
  currentStepId?: string,
): NavigationLesson | null => {
  if (!currentStepId) return modules[0]?.lessons[0] ?? null

  for (const module of modules) {
    for (const lesson of module.lessons) {
      if (lesson.steps.some((s) => s.id === currentStepId)) {
        return lesson
      }
    }
  }

  return modules[0]?.lessons[0] ?? null
}
