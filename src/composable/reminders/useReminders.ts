import { computed, ref, type Ref } from "vue";
import { fetchReminders, type IReminderFetch } from "./fetch";
import { storeReminder, type IReminderForm, type IReminderStore } from "./store";

const fetch = async (reminderFetch: Ref<IReminderFetch>, month: number, year: number, lastID: string | null = null) => {
    reminderFetch.value.isLoading = true;
    try {
        const newReminders = await fetchReminders(month, year, lastID);
        if (newReminders.length === 0) {
            reminderFetch.value.hasMore = false
            return
        }

        reminderFetch.value.reminders = [...reminderFetch.value.reminders, ...newReminders];
        reminderFetch.value.hasMore = true; // Set to false after initial fetch
    } catch (fetchError) {
        reminderFetch.value.error = 'Failed to fetch reminders';
    } finally {
        reminderFetch.value.isLoading = false;
    }
}

export const useReminders = () => {
    const reminderFetch = ref<IReminderFetch>({
        isLoading: false,
        reminders: [],
        hasMore: true,
        error: null
    });

    const reminderStore = ref<IReminderStore>({
        isLoading: false,
        error: null,
    })

    return {
        fetchedData: computed(() => reminderFetch.value),
        storedData: computed(() => reminderStore.value),
        fetch: (month: number, year: number, lastID: string | null = null) => fetch(reminderFetch, month, year, lastID),
        store: (data: IReminderForm) => storeReminder(reminderStore, data),
    };
}
