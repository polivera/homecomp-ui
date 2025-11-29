<script setup lang="ts">
import { useEntries } from "@/composable/entries";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const props = defineProps<{
    accountID: number;
    year: number;
    month: number;
}>();

const { entryFetch, fetchEntries } = useEntries();
const { formatMoney } = useCurrency();
const showDateStr = ref<string>(
    new Date(props.year, props.month - 1, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    }),
);

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const fetchMore = async () => {
    await fetchEntries(
        props.accountID,
        props.month,
        props.year,
        entryFetch.value.entries[entryFetch.value.entries.length - 1].id,
    );
};

onMounted(async () => {
    await fetchEntries(props.accountID, props.month, props.year);
});

watch(
    () => [props.accountID, props.month, props.year],
    async () => {
        // Note: does work, but I don't like it
        entryFetch.value.entries = [];
        showDateStr.value = new Date(
            props.year,
            props.month - 1,
            1,
        ).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });

        await fetchEntries(props.accountID, props.month, props.year);
    },
);

const showEntries = computed(
    () =>
        entryFetch.value.entries &&
        entryFetch.value.entries.length > 0 &&
        !entryFetch.value.error,
);
</script>

<template>
    <Table v-if="showEntries">
        <TableCaption v-if="!entryFetch.isLoading" class="mb-4"
            >Entries from {{ showDateStr }}.</TableCaption
        >
        <TableBody>
            <TableRow v-for="entry in entryFetch.entries" :key="entry.id">
                <TableCell class="font-medium">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-start">
                            <span class="text-sm text-gray-400">
                                {{ formatDate(entry.date) }} •
                                <Badge variant="outline">{{
                                    entry.categoryName
                                }}</Badge>
                            </span>
                        </div>
                        <div class="flex justify-between items-end">
                            <span class="text-left text-[1rem] sm:text-base">
                                {{ entry.description }}
                            </span>
                            <span
                                :class="
                                    entry.entryType === 'income'
                                        ? 'text-green-600 font-semibold'
                                        : 'text-red-600 font-semibold'
                                "
                            >
                                {{ formatMoney(entry.amount, entry.currency) }}
                            </span>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <div
        v-if="entryFetch.isLoading"
        class="flex items-center justify-center gap-2 py-8"
    >
        <Spinner />
        <span class="text-gray-600">Loading entries...</span>
    </div>
    <Button v-if="entryFetch.hasMore && showEntries" @click="fetchMore">
        Load More
    </Button>
</template>

<style scoped></style>
