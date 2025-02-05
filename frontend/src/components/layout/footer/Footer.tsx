import styled from 'styled-components';
import { useMatchRoute } from '@tanstack/react-router';
import PencilIcon from '../../../../assets/svgs/pencil.svg?react';
import OutIcon from '../../../../assets/svgs/out.svg?react';
import GrapoIcon from '../../../../assets/svgs/graph.svg?react';
import FooterNavLink from './FooterNavLink';

const Footer = () => {
  const matchRoute = useMatchRoute();

  // auth 페이지인지 check
  const isAuthPage =
    matchRoute({ to: '/auth/sign-in' }) || matchRoute({ to: '/auth/sign-up' });

  if (isAuthPage) return null;

  return (
    <FooterContainer>
      <FooterNav>
        <FooterNavLink to="/financial-input">
          <PencilIcon />
          <NavLabel>재무 입력</NavLabel>
        </FooterNavLink>
        <FooterNavLink to="/analysis/income/salary">
          <GrapoIcon />
          <NavLabel>결과 분석</NavLabel>
        </FooterNavLink>
        <FooterNavLink to="/logout">
          <OutIcon />
          <NavLabel>로그아웃</NavLabel>
        </FooterNavLink>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border: ${(props) => `1px solid ${props.theme.colors.grayLine}`};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  z-index: 100;
`;

const FooterNav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 575px;
`;

const NavLabel = styled.span`
  margin-top: 4px;
`;
