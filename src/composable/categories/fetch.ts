import { generateCategories } from "./mock";
import type { ICategory } from "./types";

export const fetchCategories = async (): Promise<ICategory[]> => {
    console.log('Fetching categories');
    await new Promise((resolve) => {
        setTimeout(resolve, 592);
    });
    return generateCategories(9);
}
