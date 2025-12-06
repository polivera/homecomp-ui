import type { Ref } from "vue";
import { generateCreditCardEntries, generateCreditCards } from "./mock";
import type { ICreditCardEntryFetch, ICreditCardFetch, ICreditCardDetail, ICreditCardEntryDetails } from "./types";

export const resetFetchedEntries = (creditCardEntryFetch: Ref<ICreditCardEntryFetch>): void => {
    creditCardEntryFetch.value.cards = []
}

export const fetchEntries = async (
    creditCardEntryFetch: Ref<ICreditCardEntryFetch>,
    cardId: string,
    month: number,
    year: number,
) => {
    creditCardEntryFetch.value.isLoading = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });

        const newCreditCardEntries = generateCreditCardEntries(10);
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


export const fetchCards = async (creditCardFetch: Ref<ICreditCardFetch>) => {
    creditCardFetch.value.isLoading = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });

        creditCardFetch.value.cards = generateCreditCards(5);
    } catch (fetchError) {
        creditCardFetch.value.error = 'Failed to fetch credit cards';
    } finally {
        creditCardFetch.value.isLoading = false;
    }
}


export const entryDetail = async (creditCardEntryDetail: Ref<ICreditCardEntryDetails>, entryID: string) => {
    creditCardEntryDetail.value.isLoading = true;
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 100);
        });
        const detail = generateCreditCardEntries(1)[0];
        if (detail !== null) {
            creditCardEntryDetail.value.data = detail;
        }
    } catch (fetchError) {
        creditCardEntryDetail.value.error = 'Failed to fetch credit card entry with ID: ' + entryID;
    } finally {
        creditCardEntryDetail.value.isLoading = false;
    }
}


export const cardDetail = async (creditCardDetail: Ref<ICreditCardDetail>, cardID: string) => {
    creditCardDetail.value.isLoading = true;
    try {
        const detail = generateCreditCards(1)[0];
        if (detail !== null) {
            creditCardDetail.value.data = detail;
        }
    } catch (fetchError) {
        creditCardDetail.value.error = 'Failed to fetch credit card with ID: ' + cardID;
    } finally {
        creditCardDetail.value.isLoading = false;
    }
}
