import { EIntervals } from "./reminders/types";

interface Interval {
    interval: number;
    type: EIntervals;
    key: number;
    description: string;
}

const intervals = [
    { key: 1, interval: 1, type: EIntervals.Month, description: 'Every Month' },
    { key: 2, interval: 2, type: EIntervals.Month, description: 'Every 2 Months' },
    { key: 3, interval: 3, type: EIntervals.Month, description: 'Every 3 Months' },
    { key: 4, interval: 6, type: EIntervals.Month, description: 'Every 6 Months' },
    { key: 5, interval: 1, type: EIntervals.Year, description: 'Every Year' },
]


const getIntervals = (): Interval[] => {
    return intervals
}

const getIntervalText = (interval: number, type: EIntervals) => {
    return intervals.find((it) => it.interval === interval && it.type == type)?.description || 'Interval not found'
}


export const useReminderInterval = () => {
    return {
        getIntervals,
        getIntervalText
    }
}
