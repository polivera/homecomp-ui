export interface ICategory {
    id: number;
    name: string;
}

export interface ICategoryFetch {
    isLoading: boolean;
    categories: ICategory[];
    error: string | null;
}

export interface ICategoryStore {
    isLoading: boolean;
    error: string | null;
}

export interface ICategoryForm {
    id: number | null;
    name: string;
}

export interface ICategoryDetail {
    isLoading: boolean;
    error: string | null;
    data: ICategory | null;
}
