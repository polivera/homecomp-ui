// MOCK FUNCTION TO GENERATE ENTRIES
import type { IEntry } from "@/composable/entries/fetch.ts";
import { faker } from "@faker-js/faker/locale/en";

export function generateEntries(resultCount: number, month: number, year: number): IEntry[] {
    const entries: IEntry[] = []
    const entryTypes = ['income', 'expense'];
    const categories = ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Education', 'Other', 'Groceries', 'Bills', 'Uncategorized']
    month--;
    for (let i = 0; i < resultCount; i++) {
        entries.push({
            id: `${i + 1}`,
            account: 1,
            accountName: "Personal",
            category: 3,
            categoryName: categories[faker.number.int({ min: 0, max: categories.length - 1 })],
            household: null,
            date: faker.date.between({ from: new Date(year, month + 1, 1), to: new Date(year, month + 2, 0) }).toString(),
            description: faker.commerce.productName(),
            amount: faker.number.float({ min: 1, max: 200, fractionDigits: 2 }),
            currency: 'EUR',
            entryType: entryTypes[faker.number.int({ min: 0, max: 1 })]
        })
    }
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return entries
}
