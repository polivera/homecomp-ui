import { generateReminders } from "./mock";

export interface IReminder {
    id: string;
    description: string;
    amount: number;
    currency: string;
    lapse: number;
    dateStart: string;
    dateEnd: string | null;
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

export const fetchReminders = async (month: number, year: number, lastID: string | null): Promise<IReminder[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
    return generateReminders(10);
}

export const fetchReminderDetails = async (reminderID: string): Promise<IReminder> => {
    const reminders = generateReminders(1)
    return reminders[0]
}
