import { createFileRoute } from '@tanstack/react-router';
import SignUpForm from '@/features/sign-up/SignUpForm';
import {
  AuthBottomContainer,
  AuthText,
  AuthWrapper,
} from '@/features/auth/ui/Auth';

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthWrapper>
      <div>
        <SignUpForm />
        <AuthBottomContainer>
          <AuthText>
            <a href="/auth/login">로그인하시겠습니까?</a>
          </AuthText>
        </AuthBottomContainer>
      </div>
    </AuthWrapper>
  );
}

export default RouteComponent;
