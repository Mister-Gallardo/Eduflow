import type { NavigationModule } from '@/entities/course'

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
