export const paths = {
  home: () => '/',

  auth: () => '/auth',

  account: () => '/account',

  learn: () => '/learn',

  teach: () => '/teach',

  course: {
    path: () => '/course/:courseId/step?/:stepId?',

    view: (courseId: string, stepId?: string) =>
      stepId ? `/course/${courseId}/step/${stepId}` : `/course/${courseId}`,

    editPath: () => '/course/:courseId/edit',

    edit: (courseId: string) => `/course/${courseId}/edit`,
  },
} as const
