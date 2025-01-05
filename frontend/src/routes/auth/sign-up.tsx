import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import styled from 'styled-components';

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    // 회원가입 처리 로직 추가
    console.log('회원가입 요청:', { email });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Wrapper>
      <SignUpContainer onSubmit={handleSubmit}>
        <InputLabel htmlFor="email">이메일</InputLabel>
        <CustomInput
          id="email"
          placeholder="sample@sample.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isError={emailError}
        />
        {emailError && (
          <ErrorMessage>이메일 형식으로 입력해주세요.</ErrorMessage>
        )}
        <SignUpButton disabled={emailError || !email}>회원가입</SignUpButton>
        <LoginText>
          <a href="/auth/sign-in">로그인하시겠습니까?</a>
        </LoginText>
      </SignUpContainer>
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

const SignUpContainer = styled.form`
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

const CustomInput = styled.input<{ isError: boolean }>`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: ${(props) => (props.isError ? '1px solid red' : 'none')};
  border-radius: 8px;
  background-color: #f5f5f5;
  margin-bottom: ${(props) => (props.isError ? '0' : '20px')};

  box-sizing: border-box;
`;

const ErrorMessage = styled.p`
  align-self: flex-start;
  font-size: 12px;
  color: red;
  margin: 8px 0 20px;
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.disabled ? '#7d7d7d' : '#000000')};
  background-color: ${(props) => (props.disabled ? '#e0e0e0' : '#d8fc39')};
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-bottom: 40px;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#e0e0e0' : '#c3e036')};
  }
`;

const LoginText = styled.p`
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
