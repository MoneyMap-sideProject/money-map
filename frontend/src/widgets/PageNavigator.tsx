import styled from 'styled-components';
import { useRouter } from '@tanstack/react-router';
import ChevronLeftIcon from '../../assets/svgs/chevron-left.svg?react';
import ChevronRightIcon from '../../assets/svgs/chevron-right.svg?react';

type Props = {
  showBack?: boolean;
  showForward?: boolean;
  disabledBack?: boolean;
  disabledForward?: boolean;
};

export default function PageNavigator({
  showBack = true,
  showForward = true,
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
      {showBack ? (
        <PrevButton onClick={handleGoBack} disabled={disabledBack}>
          <ChevronLeftIcon />
        </PrevButton>
      ) : null}
      {showForward ? (
        <ForwardButton onClick={handleGoForward} disabled={disabledForward}>
          <ChevronRightIcon />
        </ForwardButton>
      ) : null}
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
`;

const Button = styled.button`
  display: inline-flex;

  &:disabled {
    color: ${(props) => props.theme.colors.grayMiddle};
    cursor: not-allowed;
  }
`;

const PrevButton = styled(Button)`
  transform: translateX(-7px);
`;

const ForwardButton = styled(Button)`
  margin-left: auto;
  transform: translateX(7px);
`;
