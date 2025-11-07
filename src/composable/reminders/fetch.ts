import { generateReminders } from "./mock";

export interface IReminder {
    id: string;
    amount: number;
    currency: string;
    lapse: number;
    dateStart: string;
    dateEnd: string;
    category: number; // id
    categoryName: string;
    owner: number; // id
    ownerName: string;
    household: number; // id
    householdName: string;
}

export interface IReminderFetch {
    isLoading: boolean;
    reminders: IReminder[];
    hasMore: boolean;
    error: string | null;
}

export const fetchReminders = async (): Promise<IReminder[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
    return generateReminders(10);
}
