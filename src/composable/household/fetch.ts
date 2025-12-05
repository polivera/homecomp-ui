import { generateHouseholds } from "./mock";
import type { IHousehold } from "./types";

export const fetchHouseholds = async (): Promise<IHousehold[]> => {
    console.log('Fetching households');
    await new Promise((resolve) => {
        setTimeout(resolve, 750);
    });
    return generateHouseholds(3);
}
