import { computed, ref, type Ref } from "vue";
import { fetchCategories, type ICategoryFetch } from "./fetch";

const fetch = async (categoryFetch: Ref<ICategoryFetch>) => {
    categoryFetch.value.isLoading = true
    try {
        categoryFetch.value.categories = await fetchCategories()
    } catch (fetchError) {
        categoryFetch.value.error = 'Failed to fetch categories'
    } finally {
        categoryFetch.value.isLoading = false
    }
}


export const useCategories = () => {
    const categoryFetch = ref<ICategoryFetch>({
        isLoading: false,
        categories: [],
        error: null
    })

    return {
        categoryFetch: computed(() => categoryFetch.value),
        fetchCategories: () => fetch(categoryFetch),
    };
}
