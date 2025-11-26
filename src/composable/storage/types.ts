export interface UseStorage {
    getItem: (itemName: string) => string | null;
    setItem: (itemName: string, value: string) => void;
    removeItem: (itemName: string) => void;
}
