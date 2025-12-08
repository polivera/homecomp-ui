<script setup lang="ts">
import { useCreditCardsEntries } from '@/composable/creditcards'
import type { ICreditCardEntryListProps } from './types'
import { computed, onMounted, watch } from 'vue'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useDate } from '@/composable/useDate'
import { useCurrency } from '@/composable/currency'
import { RouterLink } from 'vue-router'

const props = defineProps<ICreditCardEntryListProps>()

const { fetch: ccFetch, reset: ccFetchReset, fetchedData: ccData } = useCreditCardsEntries()
const { formatMoney } = useCurrency()
const { formatDateMonthYearOnly } = useDate()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const showDateStr = computed(() => formatDateMonthYearOnly(props.year, props.month))

onMounted(async () => {
  await ccFetch(props.cardId, props.month, props.year)
})

watch(
  () => [props.cardId, props.month, props.year],
  async () => {
    ccFetchReset()
    await ccFetch(props.cardId, props.month, props.year)
  }
)

const showEntries = computed(() => ccData.value.cards && ccData.value.cards.length > 0 && !ccData.value.error)
</script>

<template>
  <Table v-if="showEntries">
    <TableCaption v-if="!ccData.isLoading" class="mb-4"> Credit Card Entries for {{ showDateStr }}. </TableCaption>
    <TableBody>
      <TableRow v-for="entry in ccData.cards" :key="entry.id">
        <TableCell class="p-0 font-medium">
          <RouterLink
            :to="{
              name: 'credit-card-entry-detail',
              params: { id: entry.id },
            }"
            class="block p-4 font-medium"
          >
            <div class="flex flex-col gap-1">
              <div class="flex justify-between items-start">
                <span class="text-sm text-gray-400"> Start: {{ formatDate(entry.startDate) }} </span>
                <Badge variant="outline" class="ml-1">
                  {{ entry.category }}
                </Badge>
              </div>
              <div class="flex justify-between items-end">
                <span class="text-left text-[1rem] sm:text-base">
                  {{ entry.description }}
                </span>
                <span class="font-semibold">
                  {{ formatMoney(entry.amount, 'USD') }}
                </span>
              </div>
              <div class="text-sm text-gray-500 flex gap-4">
                <span>Installments: {{ entry.currentInstallment }} / {{ entry.totalInstallments }}</span>
              </div>
            </div>
          </RouterLink>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <div v-if="ccData.isLoading" class="flex items-center justify-center gap-2 py-8">
    <Spinner />
    <span class="text-gray-600">Loading credit card entries...</span>
  </div>

  <Button v-if="ccData.hasMore && showEntries" @click="ccFetch(props.cardId, props.month, props.year)">
    Load More
  </Button>
</template>

<style scoped></style>
