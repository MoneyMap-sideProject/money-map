import { ProviderProps } from 'react';
import { ContextValue } from './type';
import { Context } from './BottomFixedContext';

export default function BottomFixedProvider({
  value,
  children,
}: ProviderProps<ContextValue>) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
