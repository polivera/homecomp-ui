import {computed, ref} from "vue";


export interface Category {
    id: number
    name: string;
}

const categories = ref<Category[]>([])
const isLoading = ref<boolean>(false)



const getCategories = () => {
    isLoading.value = true

    try {

    } catch (fetchError) {

    } finally {
        isLoading.value = false
    }
}


export const useCategories = () => {
    return {
        isLoading: computed(() => isLoading.value),
        categories: computed(() => categories.value),
        getCategories
    };
}
