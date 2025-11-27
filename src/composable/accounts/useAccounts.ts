import { computed, ref, type Ref } from "vue";
import type { IAccountFetch, IUseAccount } from "./types";
import { fetchAccounts } from "./fetch";



const fetch = async (accountFetch: Ref<IAccountFetch>): Promise<void> => {
    accountFetch.value.isLoading = true

    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        accountFetch.value.accounts = await fetchAccounts()

    } catch (fetchError) {
        accountFetch.value.error = 'Failed to fetch accounts'
    } finally {
        accountFetch.value.isLoading = false
    }
}


export const useAccounts = (): IUseAccount => {
    const accountFetch = ref<IAccountFetch>({
        isLoading: false,
        error: null,
        accounts: []
    })
    return {
        accountFetch: computed(() => accountFetch.value),
        fetch: () => fetch(accountFetch)
    };
}
