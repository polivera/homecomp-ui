import type { ComputedRef } from "vue";
import type { ECurrency } from "../currency";

export interface IAccountListItem {
    id: number;
    name: string;
    currency: string;
    balance: number;
    default: boolean;
    owned: boolean;
}

export interface IAccountItem {
    id: number;
    name: string;
    balance: number;
    currency: ECurrency;
    default: boolean;
    owner: string;
}

export interface IAccountForm {
    id: number | null;
    name: string;
    currency: string;
    balance: number;
    default: boolean
}

export interface IAccountList {
    isLoading: boolean;
    error: string | null;
    accounts: IAccountListItem[];
}

export interface IAccountStore {
    isLoading: boolean;
    error: string | null;
}

export interface IAccountDetail {
    isLoading: boolean;
    error: string | null;
    account: IAccountItem | null;
}

export interface IUseAccount {
    accountFetch: ComputedRef<IAccountList>
    accountStore: ComputedRef<IAccountStore>
    fetch: () => Promise<void>
    fetchWithCurrency: (currency: string) => Promise<void>
    store: (account: IAccountForm) => Promise<void>
    fetchDetails: (accountId: number) => Promise<void>
}
