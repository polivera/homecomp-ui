import { computed, ref } from "vue";
import type { User, LoginCredentials, AuthResponse, UseAuth } from "./types";
import { useStorage } from "../storage";


const USER_DATA_STORAGE_KEY = "xap-user" as const;

const storage = useStorage();

const compState = {
    isLoading: ref<boolean>(false),
    isAuthenticated: ref<boolean>(false),
    user: ref<User | null>(null)
}

// init - login composable
// TODO: Create an abstraction for local storage so it can be tested
const init = () => {
    if (compState.user.value) return;
    const jsonUser = storage.getItem(USER_DATA_STORAGE_KEY);
    if (jsonUser) {
        try {
            compState.user.value = JSON.parse(jsonUser);
            compState.isAuthenticated.value = true;
        } catch (error) {
            console.log('User data parse error');
            storage.removeItem(USER_DATA_STORAGE_KEY);
        }
    }
}

// setUserStorage - Manage localStorage and compState
const setUserStorage = (localUser: User | null) => {
    if (!localUser) {
        storage.removeItem(USER_DATA_STORAGE_KEY);
        compState.isAuthenticated.value = false;
        compState.user.value = null;
        return;
    }
    compState.isAuthenticated.value = true;
    storage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(localUser));
}

// login
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    compState.isLoading.value = true
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })

        if (credentials.email === "test@test.local" && credentials.password === "test") {
            compState.user.value = {
                email: credentials.email,
                name: 'Testonga',
            };
            setUserStorage(compState.user.value);
            return {
                success: true,
                user: compState.user.value as User,
            }
        }
        setUserStorage(null)
        return {
            success: false,
            message: 'Invalid email or password'
        }
    } catch (error) {
        setUserStorage(null)
        return {
            success: false,
            message: 'Login failed. Please try again later',
        }
    } finally {
        compState.isLoading.value = false
    }
}

// logout
const logout = async (): Promise<AuthResponse> => {
    compState.isLoading.value = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 3201);
        });

        setUserStorage(null);
        return {
            success: true,
            message: 'logout successful'
        }
    } catch (er) {
        // TODO: put error in the compState?
        return {
            success: false,
            message: 'Error on logout'
        }
    } finally {
        compState.isLoading.value = false;
    }
}

export const useAuth = (): UseAuth => {
    init();
    return {
        isLoading: computed(() => compState.isLoading.value),
        isAuthenticated: computed(() => compState.isAuthenticated.value),
        user: computed(() => compState.user.value),
        login,
        logout,
    }
}
