import { generateCreditCardEntries, generateCreditCards } from "./mock";
import type { ICreditCardEntry, ICreditCard } from "./types";

export const fetchCreditCardEntries = async (month: number, year: number, lastID: string | null): Promise<ICreditCardEntry[]> => {
    console.log(`Fetching credit card entries for ${month} ${year} - starting from ${lastID}`);
    await new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
    return generateCreditCardEntries(10);
}

export const fetchCreditCardEntryDetails = async (entryID: string): Promise<ICreditCardEntry> => {
    console.log(`Fetching details for credit card entry: ${entryID}`);
    await new Promise((resolve) => {
        setTimeout(resolve, 100);
    });
    const entries = generateCreditCardEntries(1);
    return entries[0];
}

export const fetchCreditCards = async (): Promise<ICreditCard[]> => {
    console.log('Fetching credit cards');
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
    return generateCreditCards(5);
}

export const fetchCreditCardDetails = async (cardID: string): Promise<ICreditCard> => {
    console.log(`Fetching details for credit card: ${cardID}`);
    await new Promise((resolve) => {
        setTimeout(resolve, 100);
    });
    const cards = generateCreditCards(1);
    return cards[0];
}
