import {computed, type Ref, ref} from "vue";
import {fetchEntries, type IEntryFetch} from "@/composable/entries/fetch.ts";
import {entryStore, storeEntry} from "@/composable/entries/store.ts";


async function fetch(
    accountID: number,
    month: number,
    year: number,
    entryFetch: Ref<IEntryFetch>
) {
    entryFetch.value.isLoading = true
    try {
        const newEntries = await fetchEntries(accountID, month, year)
        if (newEntries.length === 0) {
            entryFetch.value.hasMore = false;
            return
        }
        entryFetch.value.entries = [...entryFetch.value.entries, ...newEntries]
        return
    } catch (error) {
       entryFetch.value.error = 'Failed to fetch entries'
    } finally {
        entryFetch.value.isLoading = false
    }
}


export const useEntries = () => {
    const entryFetch = ref<IEntryFetch>({
        entries: [],
        error: null,
        hasMore: true,
        isLoading: false
    })

    return {
        entryStore: computed(() => entryStore.value),
        entryFetch: computed(() => entryFetch.value),
        fetchEntries: (accountID: number, month: number, year: number) => fetch(
            accountID, month, year, entryFetch
        ),
        storeEntry,
    };
}