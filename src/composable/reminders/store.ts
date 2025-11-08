import { ref } from "vue";

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

interface IReminderStore {
    isLoading: boolean;
    error: string | null;
}

export const reminderStore = ref<IReminderStore>({
    isLoading: false,
    error: null,
})

export const storeReminder = async (reminder: IReminderForm) => {
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
