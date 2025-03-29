import styled from 'styled-components';
import Icon from '../ui/Icon';
import { useRouter } from '@tanstack/react-router';

type Props = {
  disabledBack?: boolean;
  disabledForward?: boolean;
};

export default function PageNavigator({
  disabledBack = false,
  disabledForward = false,
}: Props) {
  const router = useRouter();

  const handleGoBack = () => {
    router.history.back();
  };

  const handleGoForward = () => {
    router.history.forward();
  };

  return (
    <NavigatorContainer>
      <button onClick={handleGoBack} disabled={disabledBack}>
        <Icon type="chevron-left" />
      </button>
      <button onClick={handleGoForward} disabled={disabledForward}>
        <Icon type="chevron-right" />
      </button>
    </NavigatorContainer>
  );
}

const NavigatorContainer = styled.nav`
  position: sticky;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  background-color: ${(props) => props.theme.colors.white};

  button {
    display: inline-flex;
  }

  button:first-child {
    transform: translateX(-7px);
  }

  button:last-child {
    margin-left: auto;
    transform: translateX(7px);
  }

  button:disabled {
    display: none;
  }
`;
