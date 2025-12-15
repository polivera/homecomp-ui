<script setup lang="ts">
import { useCategories } from '@/composable/categories'
import { computed, onMounted } from 'vue'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'

const { fetch: fetchCategories, fetchedData } = useCategories()

onMounted(async () => {
  await fetchCategories()
})

const showCategories = computed(
  () => fetchedData.value.categories && fetchedData.value.categories.length > 0 && !fetchedData.value.error
)
</script>

<template>
  <Table v-if="showCategories">
    <TableCaption v-if="!fetchedData.isLoading" class="mb-4">
      Your categories.
    </TableCaption>
    <TableBody>
      <TableRow v-for="category in fetchedData.categories" :key="category.id">
        <TableCell class="font-medium">
          <div class="flex flex-col gap-1">
            <span class="text-base">{{ category.name }}</span>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <div v-if="fetchedData.isLoading" class="flex items-center justify-center gap-2 py-8">
    <Spinner />
    <span class="text-gray-600">Loading categories...</span>
  </div>

  <div v-if="!showCategories && !fetchedData.isLoading && !fetchedData.error" class="py-8 text-center text-gray-500">
    No categories yet. Click "Add Category" to create one.
  </div>

  <div v-if="fetchedData.error" class="py-8 text-center text-red-600">
    {{ fetchedData.error }}
  </div>
</template>

<style scoped></style>
