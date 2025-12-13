<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { PlusCircleIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useDate } from '@/composable/useDate'
import { ref } from 'vue'
import CreditCardEntryList from '../components/CreditCardEntryList.vue'
import EntryFilters from '@/components/custom_ui/EntryFilters/EntryFilters.vue'

const { getCurrentMonth, getCurrentYear } = useDate()
const selectedMonth = ref<number>(getCurrentMonth())
const selectedYear = ref<number>(getCurrentYear())
const selectedCard = ref<string>('mycard')
</script>

<template>
  <div class="flex justify-between items-center border-b mb-5">
    <h1 class="text-xl font-bold py-2 text-primary">Credit Card Entries List</h1>
    <Button as-child>
      <RouterLink to="/credit-card-entry/form">
        <PlusCircleIcon />
        <span>Add Credit Card Entry</span>
      </RouterLink>
    </Button>
  </div>

  <EntryFilters v-model:month="selectedMonth" v-model:year="selectedYear" :showAccountFilter="false" />
  <CreditCardEntryList v-model:year="selectedYear" v-model:card-id="selectedCard" :month="selectedMonth" />
</template>
