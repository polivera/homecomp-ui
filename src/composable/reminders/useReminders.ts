import { computed, ref, type Ref } from "vue";
import { fetchReminders, type IReminderFetch } from "./fetch";
import { storeReminder, type IReminderForm, type IReminderStore } from "./store";

const fetch = async (reminderFetch: Ref<IReminderFetch>, month: number, year: number) => {
    reminderFetch.value.isLoading = true;
    try {
        const newReminders = await fetchReminders(month, year);
        reminderFetch.value.reminders = newReminders;
        reminderFetch.value.hasMore = false; // Set to false after initial fetch
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
        fetch: (month: number, year: number) => fetch(reminderFetch, month, year),
        store: (data: IReminderForm) => storeReminder(reminderStore, data),
    };
}
