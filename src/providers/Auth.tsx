import React, { createContext, useState, useEffect } from 'react';
import { AuthenticatedUserContext } from '../types';

interface UserContextInterface {
  context?: AuthenticatedUserContext;
  setContext: (context: AuthenticatedUserContext) => void;
}

type Props = {
  children: React.ReactNode;
};

export const context = createContext<UserContextInterface>({
  setContext: () => ({}),
});

const { Provider } = context;

export default function AuthProvider({ children }: Props) {
  const token = localStorage.getItem('token');
  const [context, setContext] = useState<AuthenticatedUserContext>(
    token ? { token } : null
  );

  useEffect(() => {
    if (context && context.token) {
      localStorage.setItem('token', context.token);
    }
  }, [context]);

  return <Provider value={{ context, setContext }}>{children}</Provider>;
}
