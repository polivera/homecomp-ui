import { generateReminders } from "./mock";
import type { IReminder } from "./types";

export const fetchReminders = async (month: number, year: number, lastID: string | null): Promise<IReminder[]> => {
    console.log(`Fetching reminders for ${month} ${year} - starting from ${lastID}`)
    await new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
    return generateReminders(10);
}

export const fetchReminderDetails = async (reminderID: string): Promise<IReminder> => {
    console.log(`Fetching details for reminder: ${reminderID}`)
    await new Promise((resolve) => {
        setTimeout(resolve, 100);
    })
    const reminders = generateReminders(1)
    return reminders[0]
}
