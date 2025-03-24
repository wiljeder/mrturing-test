import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/index.ts";

interface UserState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  activeOrganizationId: number | null;

  setAuth: (token: string, user: User) => void;
  setActiveOrganization: (organizationId: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      activeOrganizationId: null,

      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),

      setActiveOrganization: (organizationId) =>
        set({ activeOrganizationId: organizationId }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          activeOrganizationId: null,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
