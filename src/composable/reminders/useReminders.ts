import { computed, ref, type Ref } from "vue";
import { fetchReminders, fetchReminderDetails } from "./fetch";
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

const detail = async (reminderDetail: Ref<IReminderDetail>, reminderID: string) => {
    reminderDetail.value.isLoading = true;
    try {
        const detail = await fetchReminderDetails(reminderID);
        if (detail !== null) {
            reminderDetail.value.data = detail;
        }
    } catch (fetchError) {
        reminderDetail.value.error = 'Failed to fetch reminder with ID: ' + reminderID
    } finally {
        reminderDetail.value.isLoading = false
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

    const reminderFetchDetail = ref<IReminderDetail>({
        isLoading: false,
        error: null,
        data: null
    })

    return {
        fetchedData: computed(() => reminderFetch.value),
        storedData: computed(() => reminderStore.value),
        detailData: computed(() => reminderFetchDetail.value),
        fetch: (month: number, year: number, lastID: string | null = null) => fetch(reminderFetch, month, year, lastID),
        store: (data: IReminderForm) => storeReminder(reminderStore, data),
        detail: (reminderID: string) => detail(reminderFetchDetail, reminderID)
    };
}
