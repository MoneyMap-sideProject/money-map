import { createFileRoute } from '@tanstack/react-router';
import AuthWrapper from '../../components/ui/auth/AuthWrapper';
import AuthText from '../../components/ui/auth/AuthText';
import AuthBottomContainer from '../../components/ui/auth/AuthBottomContainer';
import LoginForm from '../../components/view/sign-in/LoginForm';

export const Route = createFileRoute('/auth/sign-in')({
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
