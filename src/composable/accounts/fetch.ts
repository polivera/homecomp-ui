import type { Ref } from "vue";
import { generateAccountDetails, generateAccounts } from "./mock";
import type { IAccountDetail, IAccountList } from "./types";



export const fetch = async (accountFetch: Ref<IAccountList>): Promise<void> => {
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


export const fetchWithCurrency = async (accountFetch: Ref<IAccountList>, currency: string): Promise<void> => {
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

export const fetchById = async (accountDetail: Ref<IAccountDetail>, accountId: number): Promise<void> => {
    accountDetail.value.isLoading = false;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        accountDetail.value.account = await generateAccountDetails()
    } catch (fetchError) {
        accountDetail.value.error = 'Cannout fetch account with ID: ' + accountId
    } finally {
        accountDetail.value.isLoading = false;
    }
}
