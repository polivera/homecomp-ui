import { computed, ref } from "vue";
import { entryStore, storeEntry } from "@/composable/entries/store.ts";
import type { IEntryFetch } from "./types";
import { fetch, resetFetchData } from "./fetch";



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
        resetFetchData: () => resetFetchData(entryFetch),
        fetchEntries: (accountID: number, month: number, year: number) => fetch(
            entryFetch, accountID, month, year
        ),
        storeEntry,
    };
}
