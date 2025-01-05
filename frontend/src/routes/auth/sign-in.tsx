import { createFileRoute } from '@tanstack/react-router';
import styled from 'styled-components';

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Wrapper>
      <LoginContainer action="/api/auth/sign-in" method="POST">
        <InputLabel htmlFor="email">이메일</InputLabel>
        <Input type="email" id="email" placeholder="sample@sample.com" />
        <LoginButton>로그인</LoginButton>
        <SignUpText>
          <a href="/auth/sign-up">회원가입하시겠습니까?</a>
        </SignUpText>
      </LoginContainer>
    </Wrapper>
  );
}

export default RouteComponent;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginContainer = styled.form`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputLabel = styled.label`
  align-self: flex-start;

  font-size: 14px;
  color: #7d7d7d;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #f5f5f5;
  margin-bottom: 20px;

  box-sizing: border-box;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  background-color: #d8fc39;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 40px;

  &:hover {
    background-color: #c3e036;
  }
`;

const SignUpText = styled.p`
  font-size: 14px;
  color: #000000;

  a {
    color: #000000;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #555555;
    }
  }
`;
