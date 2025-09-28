import {computed, type ComputedRef, ref} from "vue";

export interface User {
    email: string;
    name: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    token?: string;
    message?: string;
}

export interface UseAuth {
    isLoading: ComputedRef<boolean>;
    isAuthenticated: ComputedRef<boolean>;
    user: ComputedRef<User | null>;
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    getUserData: () => User | null;
}

const USER_DATA_STORAGE_KEY = "xap-user" as const;

const compState = {
    isLoading: ref<boolean>(false),
    isAuthenticated: ref<boolean>(false),
}

const user = ref<User | null>(null)

const init = () => {
    const jsonUser = localStorage.getItem(USER_DATA_STORAGE_KEY);
    if (jsonUser) {
        user.value = JSON.parse(jsonUser);
        compState.isAuthenticated.value = true;
    }
}

const getUserLocalStorage = (): User | null => {
    const jsonUser = localStorage.getItem(USER_DATA_STORAGE_KEY);
    if (jsonUser) {
        return JSON.parse(jsonUser) as User;
    }
    return null;
}

const setUserLocalStorage = (user: User | null) => {
    if (!user) {
        localStorage.removeItem(USER_DATA_STORAGE_KEY);
        compState.isAuthenticated.value = false;
        return;
    }
    compState.isAuthenticated.value = true;
    localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(user));
}

const getUserData = (): User | null => {
    if (user.value) {
        return user.value
    }
    return getUserLocalStorage();
}

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    compState.isLoading.value = true
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })

        if (credentials.email === "test@test.local" && credentials.password === "test") {
            user.value = {
                email: credentials.email,
                name: 'Testonga',
            };
            setUserLocalStorage(user.value);


            return {
                success: true,
                user: user.value as User,
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

export const useAuth = (): UseAuth => {
    init();
    return {
        isLoading: computed(() => compState.isLoading.value),
        isAuthenticated: computed(() => compState.isAuthenticated.value),
        user: computed(() => user.value),
        login,
        getUserData,
    }
}
