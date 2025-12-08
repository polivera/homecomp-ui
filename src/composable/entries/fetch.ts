import { generateEntries } from "@/composable/entries/mock.ts";
import type { IEntryFetch } from "./types";
import type { Ref } from "vue";

export const resetFetchData = (entryFetch: Ref<IEntryFetch>): void => {
    entryFetch.value.entries = []
}


export const fetch = async (
    entryFetch: Ref<IEntryFetch>,
    accountID: number,
    month: number,
    year: number,
) => {
    entryFetch.value.isLoading = true
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 600);
        });
        const newEntries = generateEntries(10, month, year)
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
