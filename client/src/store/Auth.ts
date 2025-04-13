import { create } from "zustand"
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IAuthStore {
    userId: string | null;
    isAuthenticated: boolean;
    hydrated: boolean;

    setHydrated(): void;
    login(userId: string): void;
    logout(): void;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set) => ({
            userId: null,
            isAuthenticated: false,
            hydrated: false,

            setHydrated() {
                set({ hydrated: true })
            },

            login(userId: string) {
                set({ userId, isAuthenticated: true })
            },

            logout() {
                set({ userId: null, isAuthenticated: false })
            },
            
        })),
        {
            name: "auth",
            onRehydrateStorage() {
                return (state, error) => {
                    if(!error) state?.setHydrated()
                }
            }
        }
    )
)