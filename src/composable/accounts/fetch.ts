import { generateAccounts } from "./mock";
import type { IAccount } from "./types";

export const fetchAccounts = async (): Promise<IAccount[]> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 205);
    })

    return generateAccounts(3)

}
