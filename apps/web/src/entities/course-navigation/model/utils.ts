import type { NavigationLesson, NavigationModule } from '../model'

export const findActiveModuleId = (
  modules: NavigationModule[],
  currentStepId?: string,
): string | null => {
  if (!currentStepId) return modules[0]?.id ?? null

  for (const module of modules) {
    for (const lesson of module.lessons) {
      if (lesson.steps.some((s) => s.id === currentStepId)) {
        return module.id
      }
    }
  }

  return modules[0]?.id ?? null
}

export const findActiveLesson = (
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
