<script setup lang="ts">
import {useEntries} from "@/composable/entries";
import {computed, onMounted, watch} from "vue";
import {Table, TableBody, TableCaption, TableCell, TableRow} from "@/components/ui/table";
import {useCurrency} from "@/composable/useCurrency.ts";
import {Spinner} from "@/components/ui/spinner";
import {Button} from "@/components/ui/button";

const props = defineProps<{
  accountID: number,
  year: number,
  month: number,
}>()

const {entryFetch, fetchEntries} = useEntries();
const {getCurrencySign} = useCurrency();
const showDateStr = new Date(props.year, props.month - 1, 1).toLocaleDateString(
    'en-US',
    {month: 'long', year: 'numeric'}
);

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const fetchMore = async () => {
  await fetchEntries(
      props.accountID,
      props.month,
      props.year,
      entryFetch.value.entries[entryFetch.value.entries.length - 1].id
  );
}

onMounted(async () => {
  await fetchEntries(props.accountID, props.month, props.year);
})

watch(() => [props.accountID, props.month, props.year], async () => {
  await fetchEntries(props.accountID, props.month, props.year);
})

const showEntries = computed(
    () => entryFetch.value.entries
        && entryFetch.value.entries.length > 0
        && !entryFetch.value.error
);

</script>

<template>
  <Table v-if="showEntries">
    <TableCaption v-if="!entryFetch.isLoading">Entries from {{ showDateStr }}.</TableCaption>
    <TableBody>
      <TableRow v-for="entry in entryFetch.entries" :key="entry.id">
        <TableCell class="w-[100px]">{{ formatDate(entry.date) }}</TableCell>
        <TableCell class="font-medium">{{ entry.description }}</TableCell>
        <TableCell class="text-right"> {{ entry.categoryName }}</TableCell>
        <TableCell class="text-right"
                   :class="entry.entryType === 'income' ? 'text-right text-green-600' : 'text-right text-red-600'">
          {{ getCurrencySign(entry.currency) + ' ' + entry.amount }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <div v-if="entryFetch.isLoading" class="flex items-center justify-center gap-2 py-8">
    <Spinner/>
    <span class="text-gray-600">Loading entries...</span>
  </div>
  <Button v-if="entryFetch.hasMore && showEntries" @click="fetchMore">Load More</Button>
</template>

<style scoped>

</style>