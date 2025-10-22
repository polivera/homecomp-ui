import {computed, ref} from "vue";

export interface IEntry {
    id: number | null;
    account: number;
    category: number;
    household: number | null;
    date: string;
    description: string;
    amount: number;
    entryType: string;
}

interface IEntryStore {
    isLoading: boolean;
    error: string | null;
}

interface IEntryFetch {
    isLoading: boolean;
    entries: IEntry[];
    error: string | null;
}

const entryStore = ref<IEntryStore>({
    isLoading: false,
    error: null,
})

const entryFetch = ref<IEntryFetch>({
    entries: [],
    error: null,
    isLoading: false
})

const storeEntry = async (entry: IEntry) => {
    entryStore.value.isLoading = true
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 550)
        })
        console.log('Saving entry...')
        console.log(entry)
    } catch (saveError) {
        entryStore.value.error = 'Failed to save entry'
    } finally {
        entryStore.value.isLoading = false
    }
}

const fetchEntries = async() => {
    entryFetch.value.isLoading = true

    try {

    } catch (fetchError) {
        entryFetch.value.error = 'Failed to fetch entries'
    } finally {
        entryFetch.value.isLoading = false
    }

}

export const useEntries = () => {
    return {
        entryStore: computed(() => entryStore.value),
        entryFetch: computed(() => entryFetch.value),
        fetchEntries,
        storeEntry,
    };
}