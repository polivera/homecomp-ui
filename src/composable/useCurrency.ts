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

const formatMoney = (amount: number, isoCurrency: string): string => {
    return getCurrencySign(isoCurrency) + " " + amount.toString()
}

export const useCurrency = () => {
    return {
        getCurrencySign,
        formatMoney,
    }
}
