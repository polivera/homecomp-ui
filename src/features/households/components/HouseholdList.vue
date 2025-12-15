<script setup lang="ts">
import { useHousehold } from '@/composable/household'
import { computed, onMounted } from 'vue'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'

const { fetch: fetchHouseholds, fetchedData } = useHousehold()

onMounted(async () => {
  await fetchHouseholds()
})

const showHouseholds = computed(
  () => fetchedData.value.households && fetchedData.value.households.length > 0 && !fetchedData.value.error
)
</script>

<template>
  <Table v-if="showHouseholds">
    <TableCaption v-if="!fetchedData.isLoading" class="mb-4">
      Your households.
    </TableCaption>
    <TableBody>
      <TableRow v-for="household in fetchedData.households" :key="household.id">
        <TableCell class="font-medium">
          <div class="flex flex-col gap-1">
            <span class="text-base">{{ household.name }}</span>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <div v-if="fetchedData.isLoading" class="flex items-center justify-center gap-2 py-8">
    <Spinner />
    <span class="text-gray-600">Loading households...</span>
  </div>

  <div v-if="!showHouseholds && !fetchedData.isLoading && !fetchedData.error" class="py-8 text-center text-gray-500">
    No households yet. Click "Add Household" to create one.
  </div>

  <div v-if="fetchedData.error" class="py-8 text-center text-red-600">
    {{ fetchedData.error }}
  </div>
</template>

<style scoped></style>
