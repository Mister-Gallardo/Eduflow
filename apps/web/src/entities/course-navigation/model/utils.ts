import type { NavigationLesson, NavigationModule } from '@/entities/course-navigation/model/types'

export const getCourseNavigationState = (modules: NavigationModule[], currentStepId?: string) => {
  let activeModuleId: string | null = modules[0]?.id ?? null
  let activeLesson: NavigationLesson | null = modules[0]?.lessons[0] ?? null
  const allStepIds: string[] = []
  for (const module of modules) {
    for (const lesson of module.lessons) {
      for (const step of lesson.steps) {
        allStepIds.push(step.id)
        if (step.id === currentStepId) {
          activeModuleId = module.id
          activeLesson = lesson
        }
      }
    }
  }
  const idx = currentStepId ? allStepIds.indexOf(currentStepId) : -1
  return {
    activeModuleId,
    activeLesson,
    prevStepId: idx > 0 ? allStepIds[idx - 1] : null,
    nextStepId: idx < allStepIds.length - 1 ? allStepIds[idx + 1] : null,
  }
}
