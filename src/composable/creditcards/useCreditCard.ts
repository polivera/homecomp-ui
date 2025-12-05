import { computed, ref, type Ref } from "vue";
import { fetchCreditCardEntries, fetchCreditCardEntryDetails, fetchCreditCards, fetchCreditCardDetails } from "./fetch";
import { storeCreditCardEntry } from "./store";
import {
    type ICreditCardEntryDetails,
    type ICreditCardEntryFetch,
    type ICreditCardEntryForm,
    type ICreditCardEntryStore,
    type ICreditCardFetch,
    type ICreditCardDetail
} from "./types";

const fetchEntries = async (creditCardEntryFetch: Ref<ICreditCardEntryFetch>, month: number, year: number, lastID: string | null = null) => {
    creditCardEntryFetch.value.isLoading = true;
    try {
        const newCreditCardEntries = await fetchCreditCardEntries(month, year, lastID);
        if (newCreditCardEntries.length === 0) {
            creditCardEntryFetch.value.hasMore = false;
            return;
        }

        creditCardEntryFetch.value.cards = [...creditCardEntryFetch.value.cards, ...newCreditCardEntries];
        creditCardEntryFetch.value.hasMore = true;
    } catch (fetchError) {
        creditCardEntryFetch.value.error = 'Failed to fetch credit card entries';
    } finally {
        creditCardEntryFetch.value.isLoading = false;
    }
}

const entryDetail = async (creditCardEntryDetail: Ref<ICreditCardEntryDetails>, entryID: string) => {
    creditCardEntryDetail.value.isLoading = true;
    try {
        const detail = await fetchCreditCardEntryDetails(entryID);
        if (detail !== null) {
            creditCardEntryDetail.value.data = detail;
        }
    } catch (fetchError) {
        creditCardEntryDetail.value.error = 'Failed to fetch credit card entry with ID: ' + entryID;
    } finally {
        creditCardEntryDetail.value.isLoading = false;
    }
}

const fetchCards = async (creditCardFetch: Ref<ICreditCardFetch>) => {
    creditCardFetch.value.isLoading = true;
    try {
        const cards = await fetchCreditCards();
        creditCardFetch.value.cards = cards;
    } catch (fetchError) {
        creditCardFetch.value.error = 'Failed to fetch credit cards';
    } finally {
        creditCardFetch.value.isLoading = false;
    }
}

const cardDetail = async (creditCardDetail: Ref<ICreditCardDetail>, cardID: string) => {
    creditCardDetail.value.isLoading = true;
    try {
        const detail = await fetchCreditCardDetails(cardID);
        if (detail !== null) {
            creditCardDetail.value.data = detail;
        }
    } catch (fetchError) {
        creditCardDetail.value.error = 'Failed to fetch credit card with ID: ' + cardID;
    } finally {
        creditCardDetail.value.isLoading = false;
    }
}

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
        fetch: (month: number, year: number, lastID: string | null = null) => fetchEntries(creditCardEntryFetch, month, year, lastID),
        store: (data: ICreditCardEntryForm) => storeCreditCardEntry(creditCardEntryStore, data),
        detail: (entryID: string) => entryDetail(creditCardEntryFetchDetail, entryID)
    }
}
