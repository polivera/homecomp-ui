import { logger } from "@/lib/logger";
import { generateReminders } from "./mock";
import type { IReminder } from "./types";

export const fetchReminders = async (month: number, year: number, lastID: string | null): Promise<IReminder[]> => {
  logger.info(`Fetching reminders for ${month} ${year}`)
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });
  const results = generateReminders(10);
  logger.debug(results)

  return results
}

export const fetchReminderDetails = async (reminderID: string): Promise<IReminder> => {
  logger.info(`Fetching details for reminder: ${reminderID}`)
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  })
  const reminders = generateReminders(1)
  logger.debug(reminders[0])
  return reminders[0]
}
