<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { RouterLink } from 'vue-router'
import { ReminderList } from '@/features/reminders/components'
import { ref } from 'vue'
import { PlusCircleIcon } from 'lucide-vue-next'
import EntryFilters from '@/components/custom_ui/EntryFilters/EntryFilters.vue'

const currentDate = new Date()
const selectedMonth = ref<number>(currentDate.getMonth() + 1)
const selectedYear = ref<number>(currentDate.getFullYear())
</script>

<template>
  <div class="flex justify-between items-center border-b mb-5">
    <h1 class="text-xl font-bold py-2 text-primary">Reminders List</h1>
    <Button as-child>
      <RouterLink to="/reminder/form">
        <PlusCircleIcon />
        <span>Add Reminder</span>
      </RouterLink>
    </Button>
  </div>
  <div class="flex flex-col gap-4 mt-5">
    <EntryFilters v-model:month="selectedMonth" v-model:year="selectedYear" :showAccountFilter="false" />
    <ReminderList :month="selectedMonth" :year="selectedYear" />
  </div>
</template>
