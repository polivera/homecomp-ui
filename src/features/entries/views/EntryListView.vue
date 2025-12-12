<script setup lang="ts">
import { EntryList } from '@/features/entries/components'
import { EntryFilters } from '@/components/custom_ui/EntryFilters'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PlusCircleIcon } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { useDate } from '@/composable/useDate'

const { getCurrentMonth, getCurrentYear } = useDate()

const year = ref<number>(getCurrentYear())
const month = ref<number>(getCurrentMonth())
const selectedAccountId = ref<number>(1)
</script>

<template>
  <div class="flex justify-between items-center border-b">
    <h1 class="text-xl font-bold py-2 text-primary">Entry List</h1>
    <Button as-child>
      <RouterLink to="/entry/form">
        <PlusCircleIcon />
        <span>Add Entry</span>
      </RouterLink>
    </Button>
  </div>
  <div class="flex flex-col gap-4 py-4">
    <EntryFilters
      v-model:month="month"
      v-model:year="year"
      v-model:account-id="selectedAccountId"
    />
    <EntryList :month="month" v-model:year="year" :account-id="selectedAccountId" />
  </div>
</template>

<style scoped></style>
