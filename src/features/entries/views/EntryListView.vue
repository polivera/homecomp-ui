<script setup lang="ts">
import { EntryList } from '@/features/entries/components'
import { MonthAndYearSelect } from '@/components/custom_ui/MonthAndYearSelect'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PlusCircleIcon } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { useDate } from '@/composable/useDate'
import AccountSelector from '@/components/custom_ui/AccountSelector/AccountSelector.vue'

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
  <div>
    <MonthAndYearSelect v-model:month="month" v-model:year="year" />
  </div>
  <div class="py-4">
    <AccountSelector v-model:account-id="selectedAccountId" :month="month" :year="year" />
    <EntryList :month="month" v-model:year="year" :account-id="selectedAccountId" />
  </div>
</template>

<style scoped></style>
