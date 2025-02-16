import styled from 'styled-components';
import FooterNavLink from './FooterNavLink';
import Icon from '../../ui/Icon';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterNav>
        <FooterNavLink to="/financial-input">
          <Icon type="pencil" />
          <NavLabel>재무 입력</NavLabel>
        </FooterNavLink>
        <FooterNavLink to="/analysis/income/salary">
          <Icon type="grapo" />
          <NavLabel>결과 분석</NavLabel>
        </FooterNavLink>
        <FooterNavLink to="/logout">
          <Icon type="out" />
          <NavLabel>로그아웃</NavLabel>
        </FooterNavLink>
      </FooterNav>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  border: ${(props) => `1px solid ${props.theme.colors.grayLine}`};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
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
