import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * User store - manages user authentication state
 */

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);
