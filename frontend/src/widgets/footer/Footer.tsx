import styled from 'styled-components';
import Icon from '@/shared/ui/Icon';
import FooterNavLink from './FooterNavLink';
import { ForwardedRef, forwardRef } from 'react';
import LogoutButton from '@/features/logout/LogoutButton';

const Footer = forwardRef(function Footer(
  _,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <FooterWrapper ref={ref}>
      <FooterNav>
        <FooterNavLink to="/financial-input">
          <Icon type="pencil" />
          <NavLabel>재무 입력</NavLabel>
        </FooterNavLink>
        <FooterNavLink to="/analysis/income/salary">
          <Icon type="graph" />
          <NavLabel>결과 분석</NavLabel>
        </FooterNavLink>
        <LogoutButton />
      </FooterNav>
    </FooterWrapper>
  );
});

export default Footer;

const FooterWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  border: ${(props) => `1px solid ${props.theme.colors.grayLine}`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.colors.white};
`;

const FooterNav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: ${(props) => props.theme.pageLayout.breakPoint};
`;

const NavLabel = styled.span`
  margin-top: 4px;
`;
