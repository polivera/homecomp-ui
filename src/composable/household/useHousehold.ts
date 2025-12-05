import { computed, ref, type Ref } from "vue";
import { fetchHouseholds } from "./fetch";
import { storeHousehold as storeHouseholdAPI } from "./store";
import type { IHouseholdFetch, IHouseholdForm, IHouseholdStore } from "./types";

const fetchHouseholdsData = async (householdFetch: Ref<IHouseholdFetch>) => {
    householdFetch.value.isLoading = true;
    try {
        const households = await fetchHouseholds();
        householdFetch.value.households = households;
    } catch (fetchError) {
        householdFetch.value.error = 'Failed to fetch households';
    } finally {
        householdFetch.value.isLoading = false;
    }
}

export const useHousehold = () => {
    const householdFetch = ref<IHouseholdFetch>({
        isLoading: false,
        households: [],
        error: null
    });

    const householdStore = ref<IHouseholdStore>({
        isLoading: false,
        error: null
    });

    return {
        fetchedData: computed(() => householdFetch.value),
        storedData: computed(() => householdStore.value),
        fetch: () => fetchHouseholdsData(householdFetch),
        store: (data: IHouseholdForm) => storeHouseholdAPI(householdStore, data)
    };
}
