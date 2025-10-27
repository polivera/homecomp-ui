const getCurrencySign = (isoName: string) => {
    switch (isoName) {
        case 'USD':
            return '$'
        case 'EUR':
            return '€'
        case 'ARS':
            return 'A$'
    }
}

export const useCurrency = () => {
    return {
        getCurrencySign
    }
}