import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import NotFound from './components/404';
import GlobalStyle from './styles/GlobalStyle';
import { AppQueryProvider } from './api/AppQueryProvider';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <AppQueryProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </AppQueryProvider>
  );
}

export default App;
