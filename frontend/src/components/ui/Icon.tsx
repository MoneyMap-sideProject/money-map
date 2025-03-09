import { lazy, Suspense } from 'react';

type IconType = 'pencil' | 'out' | 'grapo' | 'chevronLeft' | 'chevronRight';

const getIcon = (type: IconType) => {
  switch (type) {
    case 'pencil':
      return lazy(() => import('../../../assets/svgs/pencil.svg?react'));
    case 'out':
      return lazy(() => import('../../../assets/svgs/out.svg?react'));
    case 'grapo':
      return lazy(() => import('../../../assets/svgs/graph.svg?react'));
    case 'chevronLeft':
      return lazy(() => import('../../../assets/svgs/chevron-left.svg?react'));
    case 'chevronRight':
      return lazy(() => import('../../../assets/svgs/chevron-right.svg?react'));
    default:
      return null;
  }
};

type Props = {
  type: IconType;
};

// TODO: 아이콘 사이즈 받을 수 있게 하기
export default function Icon({ type }: Props) {
  const IconComponent = getIcon(type);

  if (!IconComponent) return null;

  return (
    <Suspense>
      <IconComponent />
    </Suspense>
  );
}
