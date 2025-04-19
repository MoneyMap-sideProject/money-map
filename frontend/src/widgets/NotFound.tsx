import Button from '@/shared/ui/Button';
import BottomFixedContainer from '@/shared/ui/bottom-fixed/BottomFixedContainer';
import { useRouter } from '@tanstack/react-router';
import styled from 'styled-components';

export default function NotFound() {
  const router = useRouter();

  const handleClickPrev = () => {
    router.history.back();
  };

  return (
    <Wrapper>
      <Title>404 Not Found</Title>
      <Description>페이지를 찾을 수 없습니다.</Description>

      <BottomFixedContainer>
        <ButtonWrapper>
          <Button onClick={handleClickPrev}>이전 페이지로 이동</Button>
        </ButtonWrapper>
      </BottomFixedContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 64px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const Description = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.grayDark};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.pageLayout.breakPoint};
  padding: 20px ${(props) => props.theme.pageLayout.paddingX} 24px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.white};
`;
