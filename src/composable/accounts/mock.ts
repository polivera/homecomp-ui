import { faker } from "@faker-js/faker/locale/en";
import type { IAccount } from "./types";
import { useCurrency } from "../currency";

const { fetch: currencyFetch, fetchData: currencyData } = useCurrency();

export async function generateAccounts(resultCount: number): Promise<IAccount[]> {
    await currencyFetch();
    const accounts: IAccount[] = []
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
