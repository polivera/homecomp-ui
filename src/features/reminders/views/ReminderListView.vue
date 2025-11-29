<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { RouterLink } from "vue-router";
import { MonthAndYearSelect } from "@/components/custom_ui/MonthAndYearSelect";
import { ReminderList } from "@/features/reminders/components";
import { ref } from "vue";
import { PlusCircleIcon } from "lucide-vue-next";

const currentDate = new Date();
const selectedMonth = ref<number>(currentDate.getMonth());
const selectedYear = ref<number>(currentDate.getFullYear());
</script>

<template>
  <div class="flex justify-between items-center border-b mb-5">
    <h1 class="text-xl font-bold py-2 text-primary">Reminders List</h1>
    <Button asChild>
      <RouterLink to="/reminder/add">
        <PlusCircleIcon />
        <span>Add Reminder</span>
      </RouterLink>
    </Button>
  </div>
  <div class="flex flex-col gap-4 mt-5">
    <MonthAndYearSelect
      :month="selectedMonth"
      :year="selectedYear"
      @update:month="(month) => (selectedMonth = month)"
      @update:year="(year) => (selectedYear = year)"
    />

    <ReminderList :month="selectedMonth" :year="selectedYear" />
  </div>
</template>
