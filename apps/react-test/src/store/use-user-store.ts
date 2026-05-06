import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type User } from "@project/shared-types";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User) => unknown;
  logout: () => unknown;
  setLoading: (isLoading: boolean) => unknown;
}

export const useUserStore = create<UserStore>()(
  persist(
    immer((set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      loading: false,

      // Action
      setUser: (user: User) =>
        set((state) => {
          state.user = user;
          state.isAuthenticated = true;
        }),

      logout: () =>
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
        }),

      setLoading: (isLoading: boolean) =>
        set((state) => {
          state.loading = isLoading;
        }),
    })),
    {
      name: "app-storage",
      //* Storage in localStorage for default, also without include the parameter.
      storage: createJSONStorage(() => sessionStorage),

      partialize: (state: UserState) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
