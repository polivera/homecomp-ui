import { computed, ref, type Ref } from "vue";
import { fetchCategories } from "./fetch";
import { storeCategory as storeCategoryAPI } from "./store";
import type { ICategoryFetch, ICategoryForm, ICategoryStore } from "./types";

const fetchCategoriesData = async (categoryFetch: Ref<ICategoryFetch>) => {
    categoryFetch.value.isLoading = true;
    try {
        const categories = await fetchCategories();
        categoryFetch.value.categories = categories;
    } catch (fetchError) {
        categoryFetch.value.error = 'Failed to fetch categories';
    } finally {
        categoryFetch.value.isLoading = false;
    }
}

export const useCategories = () => {
    const categoryFetch = ref<ICategoryFetch>({
        isLoading: false,
        categories: [],
        error: null
    });

    const categoryStore = ref<ICategoryStore>({
        isLoading: false,
        error: null
    });

    return {
        fetchedData: computed(() => categoryFetch.value),
        storedData: computed(() => categoryStore.value),
        fetch: () => fetchCategoriesData(categoryFetch),
        store: (data: ICategoryForm) => storeCategoryAPI(categoryStore, data)
    };
}
