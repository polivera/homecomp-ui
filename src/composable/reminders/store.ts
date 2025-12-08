import { type Ref } from "vue";
import type { IReminderForm, IReminderStore } from "./types";
import { logger } from "@/lib/logger";


export const storeReminder = async (reminderStore: Ref<IReminderStore>, reminder: IReminderForm) => {
  reminderStore.value.isLoading = true;
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 550);
    });
    logger.info('Saving reminder...')
    logger.debug(reminder)
  } catch (saveError) {
    reminderStore.value.error = 'Failed to save reminder';
    logger.error(saveError)
  } finally {
    reminderStore.value.isLoading = false;
  }
}
