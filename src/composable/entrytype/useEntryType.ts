import type { SelectOption } from "@/components/custom_ui/FormSelect";
import type { IEntryType, IUseEntryType } from "./type";


const getEntryTypes = (): IEntryType[] => {
    return [
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' }
    ]
}

export const getEntryTypeDropdown = (): SelectOption[] => {
    return getEntryTypes().map((it) => ({ ...it, disable: false }));
}

export const useEntryType = (): IUseEntryType => {
    return {
        getEntryTypes,
        getEntryTypeDropdown,
    }
}
