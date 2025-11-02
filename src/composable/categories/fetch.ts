import { generateCategories } from "./mock";

export interface ICategory {
    id: number;
    name: string;
}


export interface ICategoryFetch {
    isLoading: boolean;
    categories: ICategory[];
    error: string | null;
}

export const fetchCategories = async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 592)
    });
    return generateCategories(9);
}
