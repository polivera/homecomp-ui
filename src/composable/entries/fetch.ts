import {generateEntries} from "@/composable/entries/mock.ts";

export interface IEntry {
    id: number;
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

export const fetchEntries = async (accountID: number, month: number, year: number): Promise<IEntry[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500)
    })
    return generateEntries(10, month, year)
}