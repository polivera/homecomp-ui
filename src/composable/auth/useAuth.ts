import { computed, ref } from "vue";
import type { User, LoginCredentials, AuthResponse, UseAuth } from "./types";


const USER_DATA_STORAGE_KEY = "xap-user" as const;

const compState = {
    isLoading: ref<boolean>(false),
    isAuthenticated: ref<boolean>(false),
    user: ref<User | null>(null)
}
let isInitialized = false;

// init - login composable
// TODO: Create an abstraction for local storage so it can be tested
const init = () => {
    if (isInitialized) return;
    isInitialized = true;

    const jsonUser = localStorage.getItem(USER_DATA_STORAGE_KEY);
    if (jsonUser) {
        try {
            compState.user.value = JSON.parse(jsonUser);
            compState.isAuthenticated.value = true;
        } catch (error) {
            console.log('User data parse error');
            localStorage.removeItem(USER_DATA_STORAGE_KEY);
        }
    }
}

// setUserLocalStorage - Manage localStorage and compState
const setUserLocalStorage = (localUser: User | null) => {
    if (!localUser) {
        localStorage.removeItem(USER_DATA_STORAGE_KEY);
        compState.isAuthenticated.value = false;
        compState.user.value = null;
        isInitialized = false;
        return;
    }
    compState.isAuthenticated.value = true;
    localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(localUser));
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
            setUserLocalStorage(compState.user.value);
            return {
                success: true,
                user: compState.user.value as User,
            }
        }
        setUserLocalStorage(null)
        return {
            success: false,
            message: 'Invalid email or password'
        }
    } catch (error) {
        setUserLocalStorage(null)
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

        setUserLocalStorage(null);
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
