'use client';

import { AccountResType } from '@/schema-validations/account.schema';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

type User = AccountResType['result'];

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false
});

export const useAppContext = () => {
  if (!useContext(AppContext))
    throw new Error('useAppContext must be used within a AppContextProvider');

  return useContext(AppContext);
};

export default function AppContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  const setUser = useCallback(
    (user: User | null) => {
      setUserState(user);
      localStorage.setItem('user', JSON.stringify(user));
    },
    [setUserState]
  );

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUserState(user ? JSON.parse(user) : null);
  }, [setUserState]);

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}
