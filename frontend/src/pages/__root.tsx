import { createRootRouteWithContext } from '@tanstack/react-router';
import RootLayout from '@/app/layouts/RootLayout';
import { Email } from '@/shared/api/user/type';

type ContextValue = {
  auth: {
    email: Email | null;
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
