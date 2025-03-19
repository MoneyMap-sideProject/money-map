import { createContext, ProviderProps, useContext } from 'react';

type ContextValue = {
  bottomPosition: number;
};

const Context = createContext<ContextValue | null>(null);

export function BottomFixedProvider({
  value,
  children,
}: ProviderProps<ContextValue>) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useBottomFixedContainer() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'BottomFixedProvider 하위 컴포넌트에서만 호출할 수 있습니다.',
    );
  }

  return context;
}
