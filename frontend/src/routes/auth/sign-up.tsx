import { createFileRoute } from '@tanstack/react-router';
import AuthText from '../../components/ui/auth/AuthText';
import AuthWrapper from '../../components/ui/auth/AuthWrapper';
import AuthBottomContainer from '../../components/ui/auth/AuthBottomContainer';
import AuthContainer from '../../components/ui/auth/AuthContainer';
import SignUpForm from '../../components/view/sign-up/SignUpForm';

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthWrapper>
      <AuthContainer>
        <SignUpForm />
        <AuthBottomContainer>
          <AuthText>
            <a href="/auth/sign-in">로그인하시겠습니까?</a>
          </AuthText>
        </AuthBottomContainer>
      </AuthContainer>
    </AuthWrapper>
  );
}

export default RouteComponent;
