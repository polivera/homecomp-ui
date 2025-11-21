<script setup lang="ts">
import { useReminders } from "@/composable/reminders";
import { computed, onMounted, watch, ref } from "vue";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useCurrency } from "@/composable/useCurrency.ts";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDate } from "@/composable/useDate";

const props = defineProps<{
    year: number;
    month: number;
}>();

const { fetch: reminderFetchAction, fetchedData: reminderFetchData } =
    useReminders();

const { formatMoney } = useCurrency();
const { formatDateMonthYearOnly } = useDate();
const showDateStr = ref<string>(
    formatDateMonthYearOnly(props.year, props.month),
);

// TODO: Change this for the useDate one
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};

const fetchMore = async () => {
    await reminderFetchAction(
        props.month,
        props.year,
        reminderFetchData.value.reminders[
            reminderFetchData.value.reminders.length - 1
        ].id,
    );
};

onMounted(async () => {
    await reminderFetchAction(props.month, props.year);
    console.log(reminderFetchData.value);
});

watch(
    () => [props.month, props.year],
    async () => {
        // Clear reminders and update display date
        reminderFetchData.value.reminders = [];
        showDateStr.value = new Date(
            props.year,
            props.month,
            1,
        ).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });

        await reminderFetchAction(props.month, props.year);
    },
);

const showReminders = computed(
    () =>
        reminderFetchData.value.reminders &&
        reminderFetchData.value.reminders.length > 0 &&
        !reminderFetchData.value.error,
);
</script>

<template>
    <Table v-if="showReminders">
        <TableCaption v-if="!reminderFetchData.isLoading" class="mb-4"
            >Reminders for {{ showDateStr }}.</TableCaption
        >
        <TableBody>
            <TableRow
                v-for="reminder in reminderFetchData.reminders"
                :key="reminder.id"
            >
                <TableCell class="font-medium">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-start">
                            <span class="text-sm text-gray-400">
                                From: {{ formatDate(reminder.dateStart) }}
                                <span v-if="reminder.dateEnd">
                                    - To: {{ formatDate(reminder.dateEnd) }}
                                </span>
                                <Badge variant="outline" class="ml-1">{{
                                    reminder.categoryName
                                }}</Badge>
                            </span>
                        </div>
                        <div class="flex justify-between items-end">
                            <span class="text-left text-[1rem] sm:text-base">
                                {{ reminder.description }}
                            </span>
                            <span class="font-semibold">
                                {{
                                    formatMoney(
                                        reminder.amount,
                                        reminder.currency,
                                    )
                                }}
                            </span>
                        </div>
                        <div class="text-sm text-gray-500">
                            Every {{ reminder.lapse }} days
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <div
        v-if="reminderFetchData.isLoading"
        class="flex items-center justify-center gap-2 py-8"
    >
        <Spinner />
        <span class="text-gray-600">Loading reminders...</span>
    </div>

    <Button
        v-if="reminderFetchData.hasMore && showReminders"
        @click="reminderFetchAction"
    >
        Load More
    </Button>
</template>

<style scoped></style>
