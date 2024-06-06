'use client';

import { AccountResType } from '@/app/schema-validations/account.schema';
import { createContext, useContext, useEffect, useState } from 'react';

type User = AccountResType['data'];

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
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setUser(JSON.parse(user) ?? null);
  }, [setUser]);

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}
