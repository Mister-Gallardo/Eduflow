import {
  zCreateCourseInput,
  zCreateLessonInput,
  zCreateModuleInput,
  zCreateStepInput,
  zDeleteCourseInput,
  zDeleteLessonInput,
  zDeleteModuleInput,
  zDeleteStepInput,
  zGetCourseEditorInput,
  zReorderLessonsInput,
  zReorderModulesInput,
  zReorderStepsInput,
  zUpdateCourseEditorInput,
  zUpdateLessonInput,
  zUpdateModuleInput,
  zUpdateStepInput,
} from '@eduflow/shared'

import { protectedProcedure, router } from '../../trpc/trpc.js'

import {
  createCourseService,
  createLessonService,
  createModuleService,
  createStepService,
  deleteCourseService,
  deleteLessonService,
  deleteModuleService,
  deleteStepService,
  getCourseEditorService,
  reorderLessonsService,
  reorderModulesService,
  reorderStepsService,
  updateCourseEditorService,
  updateLessonService,
  updateModuleService,
  updateStepService,
} from './teach-editor.service.js'

export const teachEditorRouter = router({
  // ─── Course ───
  getCourse: protectedProcedure
    .input(zGetCourseEditorInput)
    .query(({ ctx, input }) => getCourseEditorService(ctx, input.courseId)),

  createCourse: protectedProcedure
    .input(zCreateCourseInput)
    .mutation(({ ctx, input }) => createCourseService(ctx, input)),

  updateCourse: protectedProcedure
    .input(zUpdateCourseEditorInput)
    .mutation(({ ctx, input }) => updateCourseEditorService(ctx, input)),

  deleteCourse: protectedProcedure
    .input(zDeleteCourseInput)
    .mutation(({ ctx, input }) => deleteCourseService(ctx, input)),

  // ─── Module ───
  createModule: protectedProcedure
    .input(zCreateModuleInput)
    .mutation(({ ctx, input }) => createModuleService(ctx, input)),

  updateModule: protectedProcedure
    .input(zUpdateModuleInput)
    .mutation(({ ctx, input }) => updateModuleService(ctx, input)),

  deleteModule: protectedProcedure
    .input(zDeleteModuleInput)
    .mutation(({ ctx, input }) => deleteModuleService(ctx, input)),

  reorderModules: protectedProcedure
    .input(zReorderModulesInput)
    .mutation(({ ctx, input }) => reorderModulesService(ctx, input)),

  // ─── Lesson ───
  createLesson: protectedProcedure
    .input(zCreateLessonInput)
    .mutation(({ ctx, input }) => createLessonService(ctx, input)),

  updateLesson: protectedProcedure
    .input(zUpdateLessonInput)
    .mutation(({ ctx, input }) => updateLessonService(ctx, input)),

  deleteLesson: protectedProcedure
    .input(zDeleteLessonInput)
    .mutation(({ ctx, input }) => deleteLessonService(ctx, input)),

  reorderLessons: protectedProcedure
    .input(zReorderLessonsInput)
    .mutation(({ ctx, input }) => reorderLessonsService(ctx, input)),

  // ─── Step ───
  createStep: protectedProcedure
    .input(zCreateStepInput)
    .mutation(({ ctx, input }) => createStepService(ctx, input)),

  updateStep: protectedProcedure
    .input(zUpdateStepInput)
    .mutation(({ ctx, input }) => updateStepService(ctx, input)),

  deleteStep: protectedProcedure
    .input(zDeleteStepInput)
    .mutation(({ ctx, input }) => deleteStepService(ctx, input)),

  reorderSteps: protectedProcedure
    .input(zReorderStepsInput)
    .mutation(({ ctx, input }) => reorderStepsService(ctx, input)),
})
