import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useBottomFixedContainer } from './BottomFixedContext';

export default function BottomFixedContainer({ children }: PropsWithChildren) {
  const { bottomPosition } = useBottomFixedContainer();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log('[bottomPosition]', bottomPosition);

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return;

    // Fixed 컴포넌트에 의해 가려지는 부분이 없도록 height 값 추가
    const PADDING = 40;
    wrapperRef.current.style.height = `${bottomPosition + PADDING}px`;
  }, []);

  return (
    <div ref={wrapperRef}>
      <FixedContainer ref={containerRef} $bottomPosition={bottomPosition}>
        {children}
      </FixedContainer>
    </div>
  );
}

const FixedContainer = styled.div<{ $bottomPosition: number }>`
  position: fixed;
  right: 0;
  bottom: ${(props) => props.$bottomPosition}px;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;
