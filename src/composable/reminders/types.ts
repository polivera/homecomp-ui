export enum EIntervals {
    Week = 'Week',
    Month = 'Month',
    Year = 'Year',
}

export interface IReminder {
    id: string;
    description: string;
    amount: number;
    currency: string;
    interval: number;
    intervalUnit: EIntervals;
    dateStart: string;
    dateEnd: string | null;
    dateNextDue: string;
    category: number; // id
    categoryName: string;
    owner: number; // id
    ownerName: string;
    household: number | null; // id
    householdName: string | null;
}

export interface IReminderFetch {
    isLoading: boolean;
    reminders: IReminder[];
    hasMore: boolean;
    error: string | null;
}

export interface IReminderDetail {
    isLoading: boolean;
    error: string | null
    data: IReminder | null
}

export interface IReminderForm {
    id: string | null;
    amount: number;
    description: string;
    currency: string;
    lapse: number;
    dateStart: string;
    dateEnd: string | null;
    category: number;
    household: number | null;
}

export interface IReminderStore {
    isLoading: boolean;
    error: string | null;
}
