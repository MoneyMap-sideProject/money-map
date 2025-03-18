import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Layout from '../widgets/Layout';

type ContextValue = {
  auth: {
    isLogin: boolean;
  };
};

export const Route = createRootRouteWithContext<ContextValue>()({
  component: () => (
    <Layout>
      <div>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </Layout>
  ),
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
