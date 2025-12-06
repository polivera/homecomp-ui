import { computed, ref } from "vue";
import type { IAccountFetch, IAccountForm, IAccountStore, IUseAccount } from "./types";
import { fetch, fetchWithCurrency } from "./fetch";
import { saveAccount } from "./store";

export const useAccounts = (): IUseAccount => {
    const accountFetch = ref<IAccountFetch>({
        isLoading: false,
        error: null,
        accounts: []
    })
    const accountStore = ref<IAccountStore>({
        isLoading: false,
        error: null
    })
    return {
        accountFetch: computed(() => accountFetch.value),
        accountStore: computed(() => accountStore.value),
        fetch: () => fetch(accountFetch),
        fetchWithCurrency: (currency: string) => fetchWithCurrency(accountFetch, currency),
        store: (account: IAccountForm) => saveAccount(accountStore, account)
    };
}
