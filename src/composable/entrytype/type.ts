import type { SelectOption } from "@/components/custom_ui/FormSelect";

export interface IEntryType {
    value: string;
    label: string;
}

export interface IUseEntryType {
    getEntryTypes(): IEntryType[];
    getEntryTypeDropdown(): SelectOption[];
}
