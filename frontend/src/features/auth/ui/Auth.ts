import styled from 'styled-components';

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100svh;

  & > div {
    width: 100%;
  }
`;

export const AuthForm = styled.form`
  width: 100%;
`;

export const AuthText = styled.p`
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

export const AuthBottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  text-align: center;
`;

export const AuthButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

export const AuthButton = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.disabled ? '#7d7d7d' : '#000000')};
  background-color: ${(props) => (props.disabled ? '#e0e0e0' : '#d8fc39')};
  border: none;
  border-radius: 12px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => (props.disabled ? '#e0e0e0' : '#c3e036')};
  }
`;
