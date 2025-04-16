import { create } from "zustand"
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IAuthStore {
    userId: string | null;
    bloodGroup: string | null;
    isAuthenticated: boolean;
    hydrated: boolean;

    setHydrated(): void;
    login(userId: string, bloodGroup: string): void;
    logout(): void;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set) => ({
            userId: null,
            isAuthenticated: false,
            hydrated: false,
            bloodGroup: null,
            
            setHydrated() {
                set({ hydrated: true })
            },

            login(userId: string, bloodGroup: string) {
                set({ userId, isAuthenticated: true, bloodGroup })
            },

            logout() {
                set({ userId: null, isAuthenticated: false, bloodGroup: null })
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