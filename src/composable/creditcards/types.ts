export interface ICreditCardEntry {
    id: string;
    description: string;
    amount: number;
    installments: number;
    interestRate: number;
    fees: number;
    startDate: string;
}

export interface ICreditCardEntryFetch {
    isLoading: boolean;
    cards: ICreditCardEntry[];
    hasMore: boolean;
    error: string | null;
}

export interface ICreditCardEntryDetails {
    isLoading: boolean;
    error: string | null;
    data: ICreditCardEntry | null;
}

export interface ICreditCardEntryForm {
    id: string | null;
    description: string;
    amount: number;
    installments: number;
    interestRate: number;
    fees: number;
    startDate: string;
}

export interface ICreditCardEntryStore {
    isLoading: boolean;
    error: string | null;
}

export interface ICreditCardLimits {
    limit: number;
    used: number;
    currency: string;
}

export interface ICreditCard {
    id: string;
    name: string;
    limit: ICreditCardLimits[];
}

export interface ICreditCardFetch {
    isLoading: boolean;
    cards: ICreditCard[];
    error: string | null;
}

export interface ICreditCardDetail {
    isLoading: boolean;
    error: string | null;
    data: ICreditCard | null;
}
