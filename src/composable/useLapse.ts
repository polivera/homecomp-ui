import type { SelectOption } from "@/components/custom_ui/FormSelect";

interface Lapse {
    days: number;
    description: string;
}

const getLapses = (): Lapse[] => {
    return [
        { days: 7, description: "Weekly (7 days)", },
        { days: 14, description: "Bi-weekly (14 days)" },
        { days: 30, description: "Monthly (30 days)" },
        { days: 60, description: "Bi-monthly (60 days)" },
        { days: 90, description: "Quarterly (90 days)" },
        { days: 365, description: "Yearly (365 days)" },
    ]
}

export const useLapse = () => {
    return {
        getLapses,
    }
}
