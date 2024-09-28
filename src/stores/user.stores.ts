import { User } from '@/types/schema-validations/account.schema';
import { create } from 'zustand';

type AppStoreType = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
};

// Wrap your store with persist middleware to save it to localStorage
// const useUserStore = create<AppStoreType>()(
//   persist(
//     set => ({
//       isAuthenticated: false,
//       user: null as User | null,
//       setUser: (user: User | null) => {
//         if (user) set({ user, isAuthenticated: Boolean(user) });
//         else set({ user, isAuthenticated: false });
//       }
//     }),
//     {
//       name: 'app-store', // Key to store the data in localStorage
//       partialize: state => ({
//         user: state.user,
//         isAuthenticated: state.isAuthenticated
//       }) // Reference state.user
//     }
//   )
// );

const useUserStore = create<AppStoreType>()(set => ({
  isAuthenticated: false,
  user: null as User | null,
  setUser: (user: User | null) => {
    if (user) set({ user, isAuthenticated: Boolean(user) });
    else set({ user, isAuthenticated: false });
  }
}));

export { useUserStore };
