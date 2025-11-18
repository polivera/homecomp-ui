import { ref, type Ref } from "vue";

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
