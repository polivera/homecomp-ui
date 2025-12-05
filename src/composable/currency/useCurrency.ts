import { computed, ref, type Ref } from "vue"
import { ECurrency } from "./types"
import type { ICurrencyFetch, IUseCurrency } from "./types"


const fetch = async (ccFetch: Ref<ICurrencyFetch>) => {
    ccFetch.value.currencies = [
        ECurrency.EUR,
        ECurrency.USD,
        ECurrency.ARS,
    ]
}

const formatMoney = (amount: number, isoCurrency: string): string => {
    return isoCurrency + " " + amount.toString()
}

export const useCurrency = (): IUseCurrency => {
    const ccFetch = ref<ICurrencyFetch>({
        isLoading: false,
        currencies: [],
        error: null,
    })

    return {
        fetchData: computed(() => ccFetch.value),
        formatMoney,
        getDefaultCurrency: (): string => ECurrency.EUR.valueOf(),
        fetch: () => fetch(ccFetch),
    }
}
