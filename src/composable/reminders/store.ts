import { type Ref } from "vue";
import type { IReminderForm, IReminderStore } from "./types";


export const storeReminder = async (reminderStore: Ref<IReminderStore>, reminder: IReminderForm) => {
    reminderStore.value.isLoading = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 550);
        });
        console.log('Saving reminder...');
        console.log(reminder);
    } catch (saveError) {
        reminderStore.value.error = 'Failed to save reminder';
    } finally {
        reminderStore.value.isLoading = false;
    }
}
