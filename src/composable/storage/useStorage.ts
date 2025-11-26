import type { UseStorage } from "./types"

const getItem = (itemName: string): string | null => {
    return localStorage.getItem(itemName)
}

const removeItem = (itemName: string): void => {
    localStorage.removeItem(itemName)
}

const setItem = (itemName: string, value: string) => {
    localStorage.setItem(itemName, value)
}

export const useStorage = (): UseStorage => {
    return {
        getItem,
        setItem,
        removeItem
    }
}
