/**
 * Date utility composable
 * Provides helper functions for common date operations
 */
export const useDate = () => {
    const formatDateToLocal = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getFirstDayOfNextMonth = (): Date => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth() + 1, 1);
    };

    const getFirstDayOfNextMonthString = (): string => {
        return formatDateToLocal(getFirstDayOfNextMonth());
    }

    const getTodayISO = (): string => {
        return formatDateToLocal(new Date());
    };

    const getFirstDayOfCurrentMonth = (): Date => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    };

    const getFirstDayOfCurrentMonthString = (): string => {
        return formatDateToLocal(getFirstDayOfCurrentMonth());
    }

    const getLastDayOfCurrentMonth = (): Date => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth() + 1, 0);
    };

    const getLastDayOfCurrentMonthString = (): string => {
        return formatDateToLocal(getLastDayOfCurrentMonth());
    }

    return {
        getFirstDayOfNextMonth,
        getFirstDayOfNextMonthString,
        getTodayISO,
        getFirstDayOfCurrentMonth,
        getFirstDayOfCurrentMonthString,
        getLastDayOfCurrentMonth,
        getLastDayOfCurrentMonthString,
    };
};
