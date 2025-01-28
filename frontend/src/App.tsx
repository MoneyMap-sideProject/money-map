import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import NotFound from './components/404';
import GlobalStyle from './styles/GlobalStyle';
import { AppQueryProvider } from './api/AppQueryProvider';
import { ToastContainer } from 'react-toastify';

const router = createRouter({
  routeTree,
  context: {
    auth: {
      isLogin: false,
    },
  },
  defaultNotFoundComponent: () => <NotFound />,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  // TODO: 세션 만료 여부 api 구현해서 결과값을 auth에 저장
  const auth = {
    isLogin: true,
  };

  return (
    <AppQueryProvider>
      <GlobalStyle />
      <RouterProvider router={router} context={{ auth }} />
      <ToastContainer />
    </AppQueryProvider>
  );
}

export default App;
