import type { ComputedRef } from "vue";

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
    message?: string;
}

export interface UseAuth {
    isLoading: ComputedRef<boolean>;
    isAuthenticated: ComputedRef<boolean>;
    user: ComputedRef<User | null>;
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    logout: () => Promise<AuthResponse>
}
