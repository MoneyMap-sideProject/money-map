export const queryKey = {
  all: ['financial'],
  calculate: () => [...queryKey.all, 'calculate'],
} as const;
