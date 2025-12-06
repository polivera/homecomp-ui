import type { ComputedRef } from "vue";

export interface IAccount {
    id: number;
    name: string;
    currency: string;
    balance: number;
    default: boolean;
    owned: boolean;
}

export interface IAccountForm {
    id: number | null;
    name: string;
    currency: string;
    balance: number;
    default: boolean
}

export interface IAccountFetch {
    isLoading: boolean;
    error: string | null;
    accounts: IAccount[];
}

export interface IAccountStore {
    isLoading: boolean;
    error: string | null;
}

export interface IUseAccount {
    accountFetch: ComputedRef<IAccountFetch>
    accountStore: ComputedRef<IAccountStore>
    fetch: () => Promise<void>
    fetchWithCurrency: (currency: string) => Promise<void>
    store: (account: IAccountForm) => Promise<void>
}
