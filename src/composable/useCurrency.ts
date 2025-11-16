import type { SelectOption } from "@/components/custom_ui/FormSelect"

const getCurrencySign = (isoName: string): string => {
    switch (isoName) {
        case 'USD':
            return '$'
        case 'EUR':
            return '€'
        case 'ARS':
            return 'A$'
        default:
            return '??'
    }
}

const getCurrencies = () => {
    return [
        'USD',
        'EUR',
        'ARS',
    ]
}

const getDefaultCurrency = () => {
    return 'EUR'
}

const getCurrencyOptions = (): SelectOption[] => {
    return [
        { value: "USD", label: "USD - US Dollar" },
        { value: "EUR", label: "EUR - Euro" },
        { value: "GBP", label: "GBP - British Pound" },
    ];
}

const formatMoney = (amount: number, isoCurrency: string): string => {
    return getCurrencySign(isoCurrency) + " " + amount.toString()
}

export const useCurrency = () => {
    return {
        getCurrencySign,
        getCurrencies,
        getCurrencyOptions,
        getDefaultCurrency,
        formatMoney,
    }
}
