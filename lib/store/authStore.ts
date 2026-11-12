import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  memberSince?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'user-me',
        name: 'Arjun Sharma',
        email: 'arjun.sharma@example.com',
        memberSince: 'Jan 2024',
      },
      isAuthenticated: true,
      login: (email: string, name?: string) => {
        const cleanName = name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        set({
          user: {
            id: 'user-me',
            name: cleanName,
            email,
            memberSince: 'Nov 2026',
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'bazaarx-auth-storage',
    }
  )
);

