import { type ComputedRef } from "vue";

export enum ECurrency {
    EUR = "EUR",
    USD = "USD",
    ARS = "ARS",
}

export interface IUseCurrency {
    fetchData: ComputedRef<ICurrencyFetch>;
    formatMoney(amount: number, isoCurrency: string): string;
    getDefaultCurrency(): string;
    fetch(): Promise<void>;
}

export interface ICurrencyFetch {
    isLoading: false,
    error: null,
    currencies: ECurrency[]
}
