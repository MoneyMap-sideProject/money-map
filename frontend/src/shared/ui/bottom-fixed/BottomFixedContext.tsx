import { createContext } from 'react';
import { ContextValue } from './type';

export const Context = createContext<ContextValue | null>(null);
