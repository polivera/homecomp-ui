import { faker } from "@faker-js/faker/locale/en";
import type { IAccount } from "./types";
import { useCurrency } from "../useCurrency";

const { getCurrencies } = useCurrency();

export function generateAccounts(resultCount: number): IAccount[] {
    const accounts: IAccount[] = []
    const currencies = getCurrencies();

    for (let i = 0; i < resultCount; i++) {
        accounts.push({
            id: i + 1,
            name: faker.company.name(),
            currency: currencies[faker.number.int({ min: 0, max: (currencies.length - 1) })],
            balance: parseFloat(faker.commerce.price()),
            default: false,
            owned: false
        })
    }

    return accounts
}
