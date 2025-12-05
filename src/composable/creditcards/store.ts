import { type Ref } from "vue";
import type { ICreditCardEntryForm, ICreditCardEntryStore } from "./types";

export const storeCreditCardEntry = async (creditCardEntryStore: Ref<ICreditCardEntryStore>, creditCardEntry: ICreditCardEntryForm) => {
    creditCardEntryStore.value.isLoading = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 550);
        });
        console.log('Saving credit card entry...');
        console.log(creditCardEntry);
    } catch (saveError) {
        creditCardEntryStore.value.error = 'Failed to save credit card entry';
    } finally {
        creditCardEntryStore.value.isLoading = false;
    }
}
