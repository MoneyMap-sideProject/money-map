import { Link, useMatchRoute } from '@tanstack/react-router';
import { ComponentProps } from 'react';
import styled from 'styled-components';

type Props = ComponentProps<typeof Link>;

export default function FooterNavLink({ to, children }: Props) {
  const matchRoute = useMatchRoute();
  const isActive = !!matchRoute({ to });

  return (
    <NavLink to={to} $isActive={isActive}>
      {children}
    </NavLink>
  );
}

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.$isActive ? props.theme.colors.black : props.theme.colors.grayDark};
  font-size: 12px;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  text-decoration: ${(props) => (props.$isActive ? 'underline' : 'none')};

  &:hover {
    text-decoration: underline;
  }
`;
