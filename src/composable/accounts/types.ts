import type { ComputedRef } from "vue";

export interface IAccount {
    id: number
    name: string;
    currency: string;
    balance: number;
    default: boolean;
    owned: boolean;
}

export interface IAccountFetch {
    isLoading: boolean;
    error: string | null;
    accounts: IAccount[];
}

export interface IUseAccount {
    accountFetch: ComputedRef<IAccountFetch>
    fetch: () => Promise<void>
}
