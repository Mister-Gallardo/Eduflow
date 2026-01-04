export const routes = {
  home: () => '/',

  ideas: {
    root: () => '/ideas',
    new: () => '/ideas/new',
    view: (ideaNick: string) => `/ideas/${ideaNick}`,
    edit: (ideaNick: string) => `/ideas/${ideaNick}/edit`,
  },

  profile: {
    edit: () => '/edit-profile',
  },

  auth: () => '/auth',
} as const
