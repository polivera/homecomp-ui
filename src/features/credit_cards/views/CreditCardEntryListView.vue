<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { PlusCircleIcon } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { MonthAndYearSelect } from "@/components/custom_ui/MonthAndYearSelect";
import { useDate } from "@/composable/useDate";
import { ref } from "vue";

const { getCurrentMonth, getCurrentYear } = useDate();
const selectedMonth = ref<number>(getCurrentMonth());
const selectedYear = ref<number>(getCurrentYear());
</script>

<template>
  <div class="flex justify-between items-center border-b mb-5">
    <h1 class="text-xl font-bold py-2 text-primary">
      Credit Card Entries List
    </h1>
    <Button asChild>
      <RouterLink to="/credit-card-entry/form">
        <PlusCircleIcon />
        <span>Add Credit Card Entry</span>
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
  </div>
</template>
