import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Footer from '../components/layout/footer/Footer';

type ContextValue = {
  auth: {
    isLogin: boolean;
  };
};

export const Route = createRootRouteWithContext<ContextValue>()({
  component: () => (
    <>
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
});
