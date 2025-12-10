export enum InputType {
    Text = "text",
    Number = "number",
    Email = "email",
    Password = "password",
    Tel = "tel",
    Url = "url",
    Date = "date",
}

export interface FormInputProps {
    label: string
    name: string
    type?: InputType
    error?: string | null
    placeholder?: string
    class?: string
    required?: boolean
    step?: number | string
}
