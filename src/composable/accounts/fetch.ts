import { generateAccounts } from "./mock";
import type { IAccount } from "./types";

export const fetchAccounts = async (): Promise<IAccount[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 205);
    })

    return generateAccounts(3)
}


export const fetchAccountsWithCurrency = async (currency: string): Promise<IAccount[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 205);
    })

    const accounts = await generateAccounts(3);

    return accounts.map((it) => {
        it.currency = currency
        return it
    })
}
