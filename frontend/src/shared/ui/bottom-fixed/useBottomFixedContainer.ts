import { useContext } from 'react';
import { Context } from './BottomFixedContext';

export default function useBottomFixedContainer() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'BottomFixedProvider 하위 컴포넌트에서만 호출할 수 있습니다.',
    );
  }

  return context;
}
