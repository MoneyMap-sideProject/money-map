import styled from 'styled-components';
import { Link, useMatchRoute } from '@tanstack/react-router';
import PencilIcon from '../../../assets/svgs/pencil.svg?react';
import OutIcon from '../../../assets/svgs/out.svg?react';
import GrapoIcon from '../../../assets/svgs/graph.svg?react';

const Footer = () => {
  const matchRoute = useMatchRoute();

  // auth 페이지인지 check
  const isAuthPage =
    matchRoute({ to: '/auth/sign-in' }) || matchRoute({ to: '/auth/sign-up' });

  const isActive = (path: string) => !!matchRoute({ to: path });

  if (isAuthPage) return null;

  return (
    <FooterContainer>
      <FooterNav>
        <NavItem to="/pencil" isActive={isActive('/pencil')}>
          <PencilIcon />
          <NavLabel>재무 입력</NavLabel>
        </NavItem>
        <NavItem to="/graph" isActive={isActive('/grapo')}>
          <GrapoIcon />
          <NavLabel>결과 분석</NavLabel>
        </NavItem>
        <NavItem to="/out" isActive={isActive('/out')}>
          <OutIcon />
          <NavLabel>로그아웃</NavLabel>
        </NavItem>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
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
  max-width: 400px;
`;

const NavItem = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isActive ? '#d8fc39' : '#7d7d7d')};
  font-size: 12px;
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};

  &:hover {
    color: ${(props) => (props.isActive ? '#d8fc39' : '#555555')};
  }
`;

const NavLabel = styled.span`
  margin-top: 4px;
`;
