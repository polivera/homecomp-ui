import {computed, ref} from "vue";

export interface Category {
    id: number
    name: string;
}

interface CategoryFetch {
    isLoading: boolean;
    categories: Category[];
    error: string | null;
}

interface CategoryStore {
    isLoading: boolean;
    error: string | null;
}

const categoryFetch = ref<CategoryFetch>({
    isLoading: false,
    categories: [],
    error: null,
});

const categoryStore = ref<CategoryStore>({
    isLoading: false,
    error: null
});

const fetchCategories = async () => {
    categoryFetch.value.isLoading = true

    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 750)
        })

        categoryFetch.value.categories = [
            {
                id: 1,
                name: 'Food',
            },
            {
                id: 2,
                name: 'Transport',
            },
            {
                id: 3,
                name: 'Shopping',
            },
            {
                id: 4,
                name: 'Health',
            },
            {
                id: 5,
                name: 'Entertainment',
            },
            {
                id: 6,
                name: 'Education',
            },
            {
                id: 7,
                name: 'Other',
            },
            {
                id: 8,
                name: 'Groceries',
            },
            {
                id: 9,
                name: 'Bills',
            },
            {
                id: 10,
                name: 'Uncategorized'
            }
        ].sort((a, b) => a.name.localeCompare(b.name))

    } catch (fetchError) {
        categoryFetch.value.error = 'Failed to fetch categories'
    } finally {
        categoryFetch.value.isLoading = false
    }
}

const storeCategory = async () => {
    categoryStore.value.isLoading = true
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 750)
        })
    } catch (saveError) {
        categoryStore.value.error = 'Failed to save categories'
    } finally {
        categoryStore.value.isLoading = false
    }
}

export const useCategories = () => {
    return {
        categoryFetch: computed(() => categoryFetch.value),
        categoryStore: computed(() => categoryStore.value),
        fetchCategories,
        storeCategory,
    };
}
