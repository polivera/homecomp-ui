import { faker } from "@faker-js/faker/locale/en";
import type { IAccountItem, IAccountListItem } from "./types";
import { useCurrency } from "../currency";

const { fetch: currencyFetch, fetchData: currencyData } = useCurrency();

export async function generateAccounts(resultCount: number): Promise<IAccountListItem[]> {
    await currencyFetch();
    const accounts: IAccountListItem[] = []
    const currencies = currencyData.value.currencies

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

export async function generateAccountDetails(): Promise<IAccountItem> {
    await currencyFetch();
    const currencies = currencyData.value.currencies

    return {
        id: faker.number.int(),
        name: faker.company.name(),
        currency: currencies[faker.number.int({ min: 0, max: (currencies.length - 1) })],
        balance: parseFloat(faker.commerce.price()),
        default: false,
        owner: faker.person.fullName()
    }
}
