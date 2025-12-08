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
        return currentDate.getMonth() + 1;
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
        const auxDate = new Date(getCurrentYear(), month - 1, 1);
        return auxDate.toLocaleString(locale, { month: "long" });
    }

    const formatDate = (dateToFormat: Date, monthFormat: any, yearFormat: any, dayFormat: any): string => {
        monthFormat = monthFormat || "long"
        yearFormat = yearFormat || "long"
        dayFormat = dayFormat || "undefined"
        return dateToFormat.toLocaleDateString(
            locale,
            {
                day: dayFormat,
                month: monthFormat,
                year: yearFormat,
            },
        );
    }

    const formatDateString = (dateToFormat: string, monthFormat: any, yearFormat: any, dayFormat: any): string => {
        const paramDate = new Date(dateToFormat)
        return formatDate(paramDate, monthFormat, yearFormat, dayFormat);
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
        return customDate(year, month).toLocaleDateString(locale, {
            month: "long",
            year: "numeric",
        });
    }

    const customDate = (year?: number | null, month?: number | null, day?: number | null): Date => {
        year = year || new Date().getMonth()
        month = month ? month - 1 : new Date().getMonth()
        day = day || new Date().getDay()
        return new Date(year, month, day)
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
        formatDateString,
    };
};
