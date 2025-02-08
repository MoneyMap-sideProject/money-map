import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import styled from 'styled-components';

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
});

const Layout = styled.div`
  max-width: ${(props) => props.theme.pageLayout.breakPoint};
  width: 100%;
  padding: 0 ${(props) => props.theme.pageLayout.paddingX};
  margin: 0 auto;
`;
