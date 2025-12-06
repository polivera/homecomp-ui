export const SYSTEM_CATEGORIES = {
    UNCATEGORIZED: -1,
    CREDIT_CARD_PAYMENTS: -2
} as const;

export const SYSTEM_CATEGORIES_NAME = {
    [SYSTEM_CATEGORIES.UNCATEGORIZED]: 'Uncategorized',
    [SYSTEM_CATEGORIES.CREDIT_CARD_PAYMENTS]: 'Credit Card Payment'
} as const;

export interface ICategory {
    id: number;
    name: string;
}

export interface ICategoryFetch {
    isLoading: boolean;
    categories: ICategory[];
    error: string | null;
}

export interface ICategoryStore {
    isLoading: boolean;
    error: string | null;
}

export interface ICategoryForm {
    id: number | null;
    name: string;
}

export interface ICategoryDetail {
    isLoading: boolean;
    error: string | null;
    data: ICategory | null;
}
