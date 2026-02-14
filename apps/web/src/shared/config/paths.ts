export const paths = {
  home: () => '/',

  auth: () => '/auth',

  learn: {
    root: () => '/learn/course/:courseId/step?/:stepId?',

    setup: (courseId: string, stepId?: string) =>
      stepId ? `/learn/course/${courseId}/step/${stepId}` : `/learn/course/${courseId}`,
  },

  teach: {
    root: () => '/teach',
    courses: () => '/teach/courses',
    editCourse: (id: string) => `/teach/courses/${id}/edit`,
  },
} as const
