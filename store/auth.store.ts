import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}

/**
 * Global auth store handling the current user session and loading state.
 */
const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    /** Updates the flag used to guard authenticated routes. */
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    /** Stores or clears the current user document in state. */
    setUser: (user) => set({ user }),
    /** Toggles loading state for UX indicators. */
    setLoading: (value) => set({isLoading: value}),

    /** Fetches the latest authenticated user record from Appwrite. */
    fetchAuthenticatedUser: async () => {
        set({isLoading: true});

        try {
            const user = await getCurrentUser();

            if(user) set({ isAuthenticated: true, user: user as unknown as User })
            else set( { isAuthenticated: false, user: null } );
        } catch (e) {
            console.log('fetchAuthenticatedUser error', e);
            set({ isAuthenticated: false, user: null })
        } finally {
            set({ isLoading: false });
        }
    }
}))

export default useAuthStore;