import { createFileRoute } from '@tanstack/react-router';
import LoginForm from '@/features/login/LoginForm';
import {
  AuthBottomContainer,
  AuthText,
  AuthWrapper,
} from '@/features/auth/ui/Auth';

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
