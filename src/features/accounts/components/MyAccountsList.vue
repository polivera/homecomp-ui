<script setup lang="ts">
import { useAccounts } from '@/composable/accounts'
import { useCurrency } from '@/composable/currency'
import { computed, onMounted } from 'vue'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'

const { fetch: fetchAccounts, fetchData } = useAccounts()
const { formatMoney } = useCurrency()

onMounted(async () => {
  await fetchAccounts()
})

const showAccounts = computed(
  () => fetchData.value.accounts && fetchData.value.accounts.length > 0 && !fetchData.value.error
)
</script>

<template>
  <Table v-if="showAccounts">
    <TableCaption v-if="!fetchData.isLoading" class="mb-4">
      Your accounts.
    </TableCaption>
    <TableBody>
      <TableRow v-for="account in fetchData.accounts" :key="account.id">
        <TableCell class="font-medium">
          <div class="flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span class="text-base">{{ account.name }}</span>
                <Badge v-if="account.default" variant="default" class="text-xs">Default</Badge>
              </div>
              <span class="text-sm text-gray-500">{{ account.currency }}</span>
            </div>
            <span class="text-base font-semibold">
              {{ formatMoney(account.balance, account.currency) }}
            </span>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <div v-if="fetchData.isLoading" class="flex items-center justify-center gap-2 py-8">
    <Spinner />
    <span class="text-gray-600">Loading accounts...</span>
  </div>

  <div v-if="!showAccounts && !fetchData.isLoading && !fetchData.error" class="py-8 text-center text-gray-500">
    No accounts yet. Click "Add Account" to create one.
  </div>

  <div v-if="fetchData.error" class="py-8 text-center text-red-600">
    {{ fetchData.error }}
  </div>
</template>

<style scoped></style>
