<script setup lang="ts">
import type { IReminder } from "@/composable/reminders/fetch";
import { useCurrency } from "@/composable/useCurrency";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const props = defineProps<{
    reminderID: string;
}>();

const { formatMoney } = useCurrency();

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const formatLapse = (days: number): string => {
    if (days === 1) return "Daily";
    if (days === 7) return "Weekly";
    if (days === 14) return "Every 2 weeks";
    if (days === 30) return "Monthly";
    if (days === 60) return "Every 2 months";
    if (days === 90) return "Quarterly";
    if (days === 365) return "Yearly";
    return `Every ${days} days`;
};
</script>

<template>
    <Card>
        <CardHeader>
            <div class="flex justify-between items-start">
                <div>
                    <CardTitle class="text-xl">{{
                        reminder.description
                    }}</CardTitle>
                    <CardDescription>{{
                        reminder.householdName
                    }}</CardDescription>
                </div>
                <Badge variant="outline">{{ reminder.categoryName }}</Badge>
            </div>
        </CardHeader>
        <CardContent class="space-y-4">
            <div class="text-3xl font-bold">
                {{ formatMoney(reminder.amount, reminder.currency) }}
            </div>

            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="text-gray-500">Frequency</span>
                    <p class="font-medium">{{ formatLapse(reminder.lapse) }}</p>
                </div>
                <div>
                    <span class="text-gray-500">Owner</span>
                    <p class="font-medium">{{ reminder.ownerName }}</p>
                </div>
                <div>
                    <span class="text-gray-500">Start Date</span>
                    <p class="font-medium">
                        {{ formatDate(reminder.dateStart) }}
                    </p>
                </div>
                <div>
                    <span class="text-gray-500">End Date</span>
                    <p class="font-medium">
                        {{
                            reminder.dateEnd
                                ? formatDate(reminder.dateEnd)
                                : "No end date"
                        }}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
