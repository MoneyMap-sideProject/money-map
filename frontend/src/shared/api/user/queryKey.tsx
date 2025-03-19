export const queryKey = {
  all: ['user'],
  signUp: () => [...queryKey.all, 'signUp'],
  login: () => [...queryKey.all, 'login'],
  users: () => [...queryKey.all, 'users'],
} as const;
