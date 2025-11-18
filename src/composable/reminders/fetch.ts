import { generateReminders } from "./mock";

export interface IReminder {
    id: string;
    description: string;
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

export const fetchReminders = async (month: number, year: number): Promise<IReminder[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
    // TODO: Use month and year to filter reminders when backend is ready
    return generateReminders(10);
}
