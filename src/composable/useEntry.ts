import {computed, ref} from "vue";

interface Entry {
    id: number | null;
    account: number;
    category: number;
    date: string;
    description: string;
    amount: number;
    entryType: string;
}

export interface EntryStore {
    isLoading: boolean;
    error: string | null;
}

const entryStore = ref<EntryStore>({
    isLoading: false,
    error: null,
})

const storeEntry = async (entry: Entry) => {
    entryStore.value.isLoading = true

    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 550)
        })
        console.log(entry)
    } catch (saveError) {
        entryStore.value.error = 'Failed to save entry'
    } finally {
        entryStore.value.isLoading = false
    }
}

export const useEntries = () => {
    return {
        entryStore: computed(() => entryStore.value),
        storeEntry,
    };
}