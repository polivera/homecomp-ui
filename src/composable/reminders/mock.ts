import { faker } from "@faker-js/faker/locale/en";
import type { IReminder } from "./fetch";
import { uuidv7 } from "uuidv7";


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function generateReminders(resultCount: number): IReminder[] {
    const reminders: IReminder[] = [];
    const categories = ['Rent', 'Utilities', 'Subscription', 'Insurance', 'Loan Payment', 'Salary', 'Investment', 'Bill Payment'];
    const households = ['Main House', 'Vacation Home', 'Shared Apartment'];
    const lapseOptions = [7, 14, 30, 60, 90, 365]; // Days between reminders

    for (let i = 0; i < resultCount; i++) {
        const dateStart = faker.date.recent({ days: 30 });
        const lapse = lapseOptions[faker.number.int({ min: 0, max: lapseOptions.length - 1 })];
        const dateEnd = faker.date.future({ years: 1, refDate: dateStart });

        reminders.push({
            id: uuidv7(),
            amount: faker.number.float({ min: 10, max: 2000, fractionDigits: 2 }),
            description: faker.commerce.productName(),
            currency: faker.helpers.arrayElement(['USD', 'EUR', 'ARS']),
            lapse: lapse,
            dateStart: dateStart.toISOString(),
            dateEnd: (getRandomInt(20) % 2 === 0) ? dateEnd.toISOString() : null,
            category: faker.number.int({ min: 1, max: 8 }),
            categoryName: categories[faker.number.int({ min: 0, max: categories.length - 1 })],
            owner: faker.number.int({ min: 1, max: 3 }),
            ownerName: faker.person.fullName(),
            household: faker.number.int({ min: 1, max: 3 }),
            householdName: households[faker.number.int({ min: 0, max: households.length - 1 })]
        });
    }

    return reminders.sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
}
