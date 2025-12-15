<script setup lang="ts">
import { useCreditCards } from '@/composable/creditcards'
import { useCurrency } from '@/composable/currency'
import { computed, onMounted } from 'vue'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'

const { fetch: fetchCards, fetchedData } = useCreditCards()
const { formatMoney } = useCurrency()

onMounted(async () => {
  await fetchCards()
})

const showCards = computed(
  () => fetchedData.value.cards && fetchedData.value.cards.length > 0 && !fetchedData.value.error
)

const formatLimits = (limits: Array<{limit: number, used: number, currency: string}>) => {
  return limits.map(limit =>
    `${limit.currency}: ${formatMoney(limit.limit, limit.currency)} (${formatMoney(limit.used, limit.currency)} used)`
  ).join(', ')
}
</script>

<template>
  <Table v-if="showCards">
    <TableCaption v-if="!fetchedData.isLoading" class="mb-4">
      Your credit cards.
    </TableCaption>
    <TableBody>
      <TableRow v-for="card in fetchedData.cards" :key="card.id">
        <TableCell class="font-medium">
          <div class="flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <span class="text-base">{{ card.name }}</span>
              <span class="text-sm text-gray-500">{{ formatLimits(card.limit) }}</span>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <div v-if="fetchedData.isLoading" class="flex items-center justify-center gap-2 py-8">
    <Spinner />
    <span class="text-gray-600">Loading credit cards...</span>
  </div>

  <div v-if="!showCards && !fetchedData.isLoading && !fetchedData.error" class="py-8 text-center text-gray-500">
    No credit cards yet. Click "Add Credit Card" to create one.
  </div>

  <div v-if="fetchedData.error" class="py-8 text-center text-red-600">
    {{ fetchedData.error }}
  </div>
</template>

<style scoped></style>
