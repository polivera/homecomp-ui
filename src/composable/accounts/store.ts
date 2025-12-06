import type { Ref } from "vue";
import type { IAccountForm, IAccountStore } from "./types";



export const saveAccount = async (accountStore: Ref<IAccountStore>, account: IAccountForm): Promise<void> => {
    accountStore.value.isLoading = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 750);
        });
        console.log('Saving account...')
        console.log(account);
    } catch (saveError) {
        accountStore.value.error = 'Failed to store the acccount'
    } finally {
        accountStore.value.isLoading = false;
    }

}
