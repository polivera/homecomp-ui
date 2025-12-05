import type { Ref } from "vue";
import type { ICategoryForm, ICategoryStore } from "./types";

export const storeCategory = async (categoryStore: Ref<ICategoryStore>, category: ICategoryForm) => {
    categoryStore.value.isLoading = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 750);
        });
        console.log('Saving category...');
        console.log(category);
    } catch (saveError) {
        categoryStore.value.error = 'Failed to save category';
    } finally {
        categoryStore.value.isLoading = false;
    }
}
