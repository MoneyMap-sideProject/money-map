export const queryKey = {
  all: ['user'],
  signUp: () => [...queryKey.all, 'signUp'],
  login: () => [...queryKey.all, 'login'],
  user: () => [...queryKey.all, 'user'],
} as const;
