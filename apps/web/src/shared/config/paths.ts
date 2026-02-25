export const paths = {
  home: () => '/',

  auth: () => '/auth',

  learn: () => '/learn',

  teach: () => '/teach',

  course: {
    path: () => '/course/:courseId/step?/:stepId?',

    view: (courseId: string, stepId?: string) =>
      stepId ? `/course/${courseId}/step/${stepId}` : `/course/${courseId}`,

    edit: (courseId: string, stepId?: string) => `${paths.course.view(courseId, stepId)}/edit`,
  },
} as const
