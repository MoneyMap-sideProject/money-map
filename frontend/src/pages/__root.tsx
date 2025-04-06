import { createRootRouteWithContext } from '@tanstack/react-router';
import RootLayout from '@/app/layouts/RootLayout';

type ContextValue = {
  auth: {
    isLogin: boolean;
  };
};

export const Route = createRootRouteWithContext<ContextValue>()({
  component: RootLayout,
  validateSearch: (search) => {
    return {
      ...search,
      'funnel-step': search['funnel-step'],
    } as
      | typeof search
      | {
          'funnel-step': string;
        };
  },
});
