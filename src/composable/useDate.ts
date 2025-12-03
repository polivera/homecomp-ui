/**
 * Date utility composable
 * Provides helper functions for common date operations
 */


export const useDate = (locale?: string) => {
    locale = locale || "en-US"
    const currentDate = new Date();

    const getCurrentDate = (): Date => {
        return currentDate;
    }

    const getCurrentMonth = (): number => {
        return currentDate.getMonth();
    }

    const getCurrentYear = (): number => {
        return currentDate.getFullYear();
    }

    // TODO: change this name
    const formatDateToLocal = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getMonthName = (month: number) => {
        const auxDate = new Date(getCurrentYear(), month, 1);
        return auxDate.toLocaleString(locale, { month: "long" });
    }

    const formatDate = (dateToFormat: Date, monthFormat: any, yearFormat: any): string => {
        monthFormat = monthFormat || "long"
        yearFormat = yearFormat || "long"
        return dateToFormat.toLocaleDateString(
            locale,
            {
                month: monthFormat,
                year: yearFormat,
            },
        );
    }

    const getFirstDayOfNextMonth = (): Date => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    };

    const getFirstDayOfNextMonthString = (): string => {
        return formatDateToLocal(getFirstDayOfNextMonth());
    }

    const getTodayISO = (): string => {
        return formatDateToLocal(currentDate);
    };

    const getFirstDayOfCurrentMonth = (): Date => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    };

    const getFirstDayOfCurrentMonthString = (): string => {
        return formatDateToLocal(getFirstDayOfCurrentMonth());
    }

    const getLastDayOfCurrentMonth = (): Date => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    };

    const getLastDayOfCurrentMonthString = (): string => {
        return formatDateToLocal(getLastDayOfCurrentMonth());
    }

    const formatDateMonthYearOnly = (month?: number | null, year?: number | null): string => {
        month = month || new Date().getMonth()
        year = year || new Date().getFullYear()
        return new Date(year, month, 1).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    }

    return {
        getCurrentDate,
        getCurrentMonth,
        getCurrentYear,
        getMonthName,
        formatDate,
        getFirstDayOfNextMonth,
        getFirstDayOfNextMonthString,
        getTodayISO,
        getFirstDayOfCurrentMonth,
        getFirstDayOfCurrentMonthString,
        getLastDayOfCurrentMonth,
        getLastDayOfCurrentMonthString,
        formatDateMonthYearOnly,
    };
};
