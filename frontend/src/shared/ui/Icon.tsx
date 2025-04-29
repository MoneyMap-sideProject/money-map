import {
  ComponentType,
  lazy,
  LazyExoticComponent,
  Suspense,
  SVGProps,
} from 'react';
import styled from 'styled-components';

// SVG 파일들 가져오기
const svgFiles = import.meta.glob<{
  default: React.ComponentType<SVGProps<SVGSVGElement>>;
}>('../../../assets/svgs/*.svg', { query: '?react' });

// 파일 경로에서 아이콘 이름 추출
const iconNames = Object.keys(svgFiles).map((path) => {
  return path.match(/\/([^/]+)\.svg$/)?.[1] || '';
});

// 아이콘 타입 정의
type IconType = (typeof iconNames)[number];

// 미리 lazy 컴포넌트 생성
const LazyIcons = Object.fromEntries(
  Object.entries(svgFiles).map(([path, importFn]) => {
    const iconName = path.match(/\/([^/]+)\.svg$/)?.[1] || '';
    return [iconName, lazy(importFn)];
  }),
) as Record<
  IconType,
  LazyExoticComponent<ComponentType<SVGProps<SVGSVGElement>>>
>;

type Props = {
  type: IconType;
  width?: string;
  height?: string;
  color?: string;
};

export default function Icon({ type, ...props }: Props) {
  const IconComponent = LazyIcons[type];

  return (
    <Suspense
      fallback={<IconFallback $width={props.width} $height={props.height} />}
    >
      <IconComponent {...props} />
    </Suspense>
  );
}

const IconFallback = styled.div<{
  $width?: string;
  $height?: string;
}>`
  display: inline-block;
  width: ${(props) => props.$width ?? 'auto'};
  height: ${(props) => props.$height ?? 'auto'};
  background-color: ${(props) => props.theme.colors.grayLine};
`;
