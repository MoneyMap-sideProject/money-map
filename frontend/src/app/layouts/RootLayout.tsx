import { useEffect, useRef, useState } from 'react';
import { Outlet, useMatchRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { BottomFixedProvider } from '../../shared/ui/bottom-fixed/BottomFixedContext';
import Footer from '../../widgets/footer/Footer';
import styled from 'styled-components';

export default function RootLayout() {
  const matchRoute = useMatchRoute();

  // auth 관련 페이지인지 확인하고 Footer 출력 결정
  const isAuthPage =
    matchRoute({ to: '/auth/login' }) || matchRoute({ to: '/auth/sign-up' });

  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    // footer height를 bottomFixedProvider에 전달하여 하위 페이지에서 bottomPixedContainer를 원활하게 사용하도록 제공
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <BottomFixedProvider value={{ bottomPosition: footerHeight }}>
        <Wrapper>
          <Outlet />
          {isAuthPage ? null : <Footer ref={footerRef} />}
        </Wrapper>
      </BottomFixedProvider>
      <TanStackRouterDevtools />
    </>
  );
}

const Wrapper = styled.div`
  max-width: ${(props) => props.theme.pageLayout.breakPoint};
  width: 100%;
  padding: 0 ${(props) => props.theme.pageLayout.paddingX};
  margin: 0 auto;
`;
