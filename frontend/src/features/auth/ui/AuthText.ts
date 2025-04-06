import styled from 'styled-components';

const AuthText = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};

  a {
    color: ${(props) => props.theme.colors.black};
    font-weight: 400;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors.grayDark};
    }
  }
`;

export default AuthText;
