import { computed, ref } from "vue";
import { fetchEntries, entryDetail, fetchCards, cardDetail, resetFetchedEntries } from "./fetch";
import { storeCreditCardEntry } from "./store";
import {
    type ICreditCardEntryDetails,
    type ICreditCardEntryFetch,
    type ICreditCardEntryForm,
    type ICreditCardEntryStore,
    type ICreditCardFetch,
    type ICreditCardDetail
} from "./types";


export const useCreditCards = () => {
    const creditCardFetch = ref<ICreditCardFetch>({
        isLoading: false,
        cards: [],
        error: null
    });

    const creditCardFetchDetail = ref<ICreditCardDetail>({
        isLoading: false,
        error: null,
        data: null
    });

    return {
        fetchedData: computed(() => creditCardFetch.value),
        detailData: computed(() => creditCardFetchDetail.value),
        fetch: () => fetchCards(creditCardFetch),
        detail: (cardID: string) => cardDetail(creditCardFetchDetail, cardID)
    };
}

export const useCreditCardsEntries = () => {
    const creditCardEntryFetch = ref<ICreditCardEntryFetch>({
        isLoading: false,
        cards: [],
        hasMore: true,
        error: null
    });

    const creditCardEntryStore = ref<ICreditCardEntryStore>({
        isLoading: false,
        error: null,
    });

    const creditCardEntryFetchDetail = ref<ICreditCardEntryDetails>({
        isLoading: false,
        error: null,
        data: null
    });

    return {
        fetchedData: computed(() => creditCardEntryFetch.value),
        storedData: computed(() => creditCardEntryStore.value),
        detailData: computed(() => creditCardEntryFetchDetail.value),
        fetch: (
            cardId: string,
            month: number,
            year: number,
        ) => fetchEntries(
            creditCardEntryFetch,
            cardId,
            month,
            year,
        ),
        reset: () => resetFetchedEntries(creditCardEntryFetch),
        store: (data: ICreditCardEntryForm) => storeCreditCardEntry(creditCardEntryStore, data),
        detail: (entryID: string) => entryDetail(creditCardEntryFetchDetail, entryID)
    }
}
