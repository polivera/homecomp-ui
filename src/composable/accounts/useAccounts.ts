import { computed, ref } from "vue";
import type { IAccountList, IAccountForm, IAccountStore, IUseAccount, IAccountDetail } from "./types";
import { fetch, fetchById, fetchWithCurrency } from "./fetch";
import { saveAccount } from "./store";

export const useAccounts = (): IUseAccount => {
  const accountFetch = ref<IAccountList>({
    isLoading: false,
    error: null,
    accounts: []
  })
  const accountStore = ref<IAccountStore>({
    isLoading: false,
    error: null
  })
  const accountDetail = ref<IAccountDetail>({
    isLoading: false,
    error: null,
    account: null
  })

  return {
    fetchData: computed(() => accountFetch.value),
    storeData: computed(() => accountStore.value),
    fetch: () => fetch(accountFetch),
    fetchWithCurrency: (currency: string) => fetchWithCurrency(accountFetch, currency),
    store: (account: IAccountForm) => saveAccount(accountStore, account),
    fetchDetails: (accountId: number) => fetchById(accountDetail, accountId)
  };
}
