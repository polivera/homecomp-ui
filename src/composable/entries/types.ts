export interface IEntry {
    id: string;
    account: number;
    accountName: string;
    category: number;
    categoryName: string;
    household: number | null;
    date: string;
    description: string;
    amount: number;
    currency: string;
    entryType: string;
}

export interface IEntryFetch {
    isLoading: boolean;
    entries: IEntry[];
    hasMore: boolean;
    error: string | null;
}
