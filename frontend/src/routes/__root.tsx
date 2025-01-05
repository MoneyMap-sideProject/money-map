import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Footer from '../components/layout/footer';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
});
