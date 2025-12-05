import { faker } from "@faker-js/faker/locale/en";
import type { ICategory } from "./types";


export function generateCategories(resultCount: number): ICategory[] {
    const categories: ICategory[] = [];

    for (let i = 0; i < resultCount; i++) {
        categories.push({
            id: i,
            name: faker.book.genre()
        })
    }

    categories.push({ id: categories.length, name: 'Uncategorized' })

    return categories.sort((a, b) => a.name.localeCompare(b.name));
}
