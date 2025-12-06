import type { Ref } from "vue";
import { generateAccounts } from "./mock";
import type { IAccountFetch } from "./types";



export const fetch = async (accountFetch: Ref<IAccountFetch>): Promise<void> => {
    accountFetch.value.isLoading = true
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        accountFetch.value.accounts = await generateAccounts(3);
    } catch (fetchError) {
        accountFetch.value.error = 'Failed to fetch accounts'
    } finally {
        accountFetch.value.isLoading = false
    }
}


export const fetchWithCurrency = async (accountFetch: Ref<IAccountFetch>, currency: string): Promise<void> => {
    accountFetch.value.isLoading = true
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        const accounts = await generateAccounts(3)
        accountFetch.value.accounts = accounts.map((it) => {
            it.currency = currency
            return it
        })
    } catch (fetchError) {
        accountFetch.value.error = 'Failed to fetch accounts'
    } finally {
        accountFetch.value.isLoading = false
    }
}
