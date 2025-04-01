import { createFileRoute } from '@tanstack/react-router';
import AuthWrapper from '../../features/auth/ui/AuthWrapper';
import SignUpForm from '../../features/sign-up/SignUpForm';
import AuthBottomContainer from '../../features/auth/ui/AuthBottomContainer';
import AuthText from '../../features/auth/ui/AuthText';

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
