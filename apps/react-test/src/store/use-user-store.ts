import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type User } from "@project/shared-types";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      // Stato Iniziale
      user: null,
      isAuthenticated: false,
      loading: false,

      // Azioni
      setUser: (user: User) =>
        set((state: UserState) => {
          state.user = user;
          state.isAuthenticated = true;
        }),

      logout: () =>
        set((state: UserState) => {
          state.user = null;
          state.isAuthenticated = false;
        }),

      setLoading: (isLoading: boolean) =>
        set((state: UserState) => {
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
