import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "@/type";
import { create } from 'zustand';

const USER_KEY = '@fastfood_user';

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
    logout: () => Promise<void>;
}

/**
 * Global auth store handling the current user session with local storage.
 */
const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    /** Updates the flag used to guard authenticated routes. */
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    
    /** Stores or clears the current user document in state and local storage. */
    setUser: async (user) => {
        if (user) {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            set({ user, isAuthenticated: true });
        } else {
            await AsyncStorage.removeItem(USER_KEY);
            set({ user: null, isAuthenticated: false });
        }
    },
    
    /** Toggles loading state for UX indicators. */
    setLoading: (value) => set({isLoading: value}),

    /** Fetches the user from local storage. */
    fetchAuthenticatedUser: async () => {
        set({isLoading: true});

        try {
            const userData = await AsyncStorage.getItem(USER_KEY);
            
            if(userData) {
                const user = JSON.parse(userData);
                set({ isAuthenticated: true, user });
            } else {
                set({ isAuthenticated: false, user: null });
            }
        } catch (e) {
            console.log('fetchAuthenticatedUser error', e);
            set({ isAuthenticated: false, user: null });
        } finally {
            set({ isLoading: false });
        }
    },

    /** Logs out the user by clearing local storage. */
    logout: async () => {
        await AsyncStorage.removeItem(USER_KEY);
        set({ isAuthenticated: false, user: null });
    }
}))

export default useAuthStore;