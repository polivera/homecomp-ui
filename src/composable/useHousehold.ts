import {computed, ref} from "vue";

export interface IHousehold {
    id: number;
    name: string;
}

interface IHouseholdFetch {
    isLoading: boolean;
    households: IHousehold[];
    error: string | null;
}

const householdFetch = ref<IHouseholdFetch>({
    isLoading: false,
    households: [],
    error: null,
})

const fetchHouseholds = async () => {
    householdFetch.value.isLoading = true
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 750)
        })
        householdFetch.value.households = [
            {
                id: 1,
                name: 'Household 1',
            },
            {
                id: 2,
                name: 'Household 2',
            },
            {
                id: 3,
                name: 'Household 3',
            }
        ]
    } catch (fetchError) {
        householdFetch.value.error = 'Failed to fetch households'
    } finally {
        householdFetch.value.isLoading = false
    }
}

export const useHousehold = () => {
    return {
        householdFetch: computed(() => householdFetch.value),
        fetchHouseholds,
    };
}
