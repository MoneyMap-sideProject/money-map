export const queryKey = {
  all: ['user'],
  signUp: () => [...queryKey.all, 'signUp'],
  user: () => [...queryKey.all, 'user'],
} as const;
