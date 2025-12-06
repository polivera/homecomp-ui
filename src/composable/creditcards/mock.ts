import { faker } from "@faker-js/faker/locale/en";
import { uuidv7 } from "uuidv7";
import type { ICreditCardEntry, ICreditCard } from "./types";

export function generateCreditCardEntries(resultCount: number): ICreditCardEntry[] {
    const creditCards: ICreditCardEntry[] = [];
    const categories = ['Rent', 'Utilities', 'Subscription', 'Insurance', 'Loan Payment', 'Salary', 'Investment', 'Bill Payment'];

    for (let i = 0; i < resultCount; i++) {
        const startDate = faker.date.recent({ days: 90 });
        const totalInstallments = faker.helpers.arrayElement([3, 6, 12, 18, 24, 36]);
        const currentInstallment = faker.number.int({ min: 1, max: totalInstallments })
        const interestRate = faker.number.float({ min: 0, max: 25, fractionDigits: 2 });
        const fees = faker.number.float({ min: 0, max: 50, fractionDigits: 2 });

        creditCards.push({
            id: uuidv7(),
            description: faker.commerce.productName(),
            amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
            category: categories[faker.number.int({ min: 0, max: categories.length - 1 })],
            totalInstallments,
            currentInstallment,
            interestRate,
            fees,
            startDate: startDate.toISOString(),
        });
    }

    return creditCards.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function generateCreditCards(resultCount: number): ICreditCard[] {
    const creditCards: ICreditCard[] = [];
    const cardNames = ['Visa Platinum', 'Mastercard Gold', 'American Express', 'Visa Classic', 'Mastercard Black'];
    const currencies = ['USD', 'EUR', 'ARS'];

    for (let i = 0; i < resultCount; i++) {
        const numLimits = faker.number.int({ min: 1, max: 3 });
        const limits = [];

        for (let j = 0; j < numLimits; j++) {
            const limit = faker.number.float({ min: 1000, max: 10000, fractionDigits: 2 });
            const used = faker.number.float({ min: 0, max: limit, fractionDigits: 2 });
            limits.push({
                limit,
                used,
                currency: currencies[faker.number.int({ min: 0, max: currencies.length - 1 })]
            });
        }

        creditCards.push({
            id: uuidv7(),
            name: cardNames[faker.number.int({ min: 0, max: cardNames.length - 1 })],
            limit: limits
        });
    }

    return creditCards;
}

