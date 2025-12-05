import { faker } from "@faker-js/faker/locale/en";
import type { IHousehold } from "./types";

export function generateHouseholds(resultCount: number): IHousehold[] {
    const households: IHousehold[] = [];

    for (let i = 0; i < resultCount; i++) {
        households.push({
            id: i,
            name: faker.company.name()
        });
    }

    return households.sort((a, b) => a.name.localeCompare(b.name));
}
