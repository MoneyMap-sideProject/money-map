import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function BottomFixedContainer({ children }: PropsWithChildren) {
  const fixedwrapperRef = useRef<HTMLDivElement>(null);
  const fixedContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fixedwrapperRef.current || !fixedContainerRef.current) return;

    // Fixed 컴포넌트에 의해 가려지는 부분이 없도록 height 값 추가
    const PADDING = 40;
    fixedwrapperRef.current.style.height = `${fixedContainerRef.current.offsetHeight + PADDING}px`;
  }, []);

  return (
    <div ref={fixedwrapperRef}>
      <FixedContainer ref={fixedContainerRef}>{children}</FixedContainer>
    </div>
  );
}

const FixedContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;
