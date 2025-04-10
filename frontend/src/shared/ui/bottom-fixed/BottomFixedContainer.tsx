import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useBottomFixedContainer from './useBottomFixedContainer';

const PADDING = 40;

export default function BottomFixedContainer({ children }: PropsWithChildren) {
  const { bottomPosition } = useBottomFixedContainer();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return;

    const containerHeight = containerRef.current.getBoundingClientRect().height;

    // Fixed 컴포넌트에 의해 가려지는 부분이 없도록 height 값 추가
    wrapperRef.current.style.height = `${bottomPosition + containerHeight + PADDING}px`;
  }, [bottomPosition]);

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
