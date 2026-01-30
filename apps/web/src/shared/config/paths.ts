export const paths = {
  home: () => '/',

  auth: () => '/auth',

  learn: {
    root: () => '/learn',

    course: (id: string) => `/learn/course/${id}`,
    lesson: (courseId: string, lessonId: string) => `/learn/course/${courseId}/lesson/${lessonId}`,
  },

  teach: {
    root: () => '/teach',
    courses: () => '/teach/courses',
    editCourse: (id: string) => `/teach/courses/${id}/edit`,
  },
} as const
