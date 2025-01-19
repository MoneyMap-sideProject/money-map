export const queryKey = {
  all: ['user'],
  signup: () => [...queryKey.all, 'signup'],
  signin: () => [...queryKey.all, 'signin'],
  users: () => [...queryKey.all, 'users'],
} as const;
