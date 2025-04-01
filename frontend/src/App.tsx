import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import Theme from '@/app/styles/DefaultTheme';
import GlobalStyle from '@/app/styles/GlobalStyle';
import { AppQueryProvider } from '@/app/providers/AppQueryProvider';
import AuthRouterProvider from '@/app/providers/AuthRouterProvider';

export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <AppQueryProvider>
        <GlobalStyle />
        <AuthRouterProvider />
        <ToastContainer />
      </AppQueryProvider>
    </ThemeProvider>
  );
}
