export interface IHousehold {
    id: number;
    name: string;
}

export interface IHouseholdFetch {
    isLoading: boolean;
    households: IHousehold[];
    error: string | null;
}

export interface IHouseholdStore {
    isLoading: boolean;
    error: string | null;
}

export interface IHouseholdForm {
    id: number | null;
    name: string;
}

export interface IHouseholdDetail {
    isLoading: boolean;
    error: string | null;
    data: IHousehold | null;
}
