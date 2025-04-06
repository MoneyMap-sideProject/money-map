import { createFileRoute } from '@tanstack/react-router';
import AuthWrapper from '../../features/auth/ui/AuthWrapper';
import LoginForm from '../../features/login/LoginForm';
import AuthBottomContainer from '../../features/auth/ui/AuthBottomContainer';
import AuthText from '../../features/auth/ui/AuthText';

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthWrapper>
      <div>
        <LoginForm />
        <AuthBottomContainer>
          <AuthText>
            <a href="/auth/sign-up">회원가입하시겠습니까?</a>
          </AuthText>
        </AuthBottomContainer>
      </div>
    </AuthWrapper>
  );
}

export default RouteComponent;
