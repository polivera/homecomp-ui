import { computed, ref, type Ref } from "vue";
import { fetchReminders, type IReminderFetch } from "./fetch";
import { reminderStore, storeReminder } from "./store";

const fetch = async (reminderFetch: Ref<IReminderFetch>) => {
    reminderFetch.value.isLoading = true;
    try {
        const newReminders = await fetchReminders();
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

    return {
        reminderFetch: computed(() => reminderFetch.value),
        reminderStore: computed(() => reminderStore.value),
        fetchReminders: () => fetch(reminderFetch),
        storeReminder,
    };
}
