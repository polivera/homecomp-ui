import type { Ref } from "vue";
import type { IHouseholdForm, IHouseholdStore } from "./types";

export const storeHousehold = async (householdStore: Ref<IHouseholdStore>, household: IHouseholdForm) => {
    householdStore.value.isLoading = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 750);
        });
        console.log('Saving household...');
        console.log(household);
    } catch (saveError) {
        householdStore.value.error = 'Failed to save household';
    } finally {
        householdStore.value.isLoading = false;
    }
}
