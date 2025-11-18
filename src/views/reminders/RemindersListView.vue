<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { RouterLink } from "vue-router";
import MonthAndYearSelect from "@/components/MonthAndYearSelect.vue";
import ReminderList from "@/components/ReminderList.vue";
import { ref } from "vue";
import { PlusCircleIcon } from "lucide-vue-next";

const currentDate = new Date();
const selectedMonth = ref<number>(currentDate.getMonth());
const selectedYear = ref<number>(currentDate.getFullYear());
</script>

<template>
    <div class="flex flex-col gap-4">
        <Button asChild>
            <RouterLink to="/reminder/add">
                <PlusCircleIcon />
                <span>Add Reminder</span>
            </RouterLink>
        </Button>

        <MonthAndYearSelect
            :month="selectedMonth"
            :year="selectedYear"
            @update:month="(month) => (selectedMonth = month)"
            @update:year="(year) => (selectedYear = year)"
        />

        <ReminderList :month="selectedMonth" :year="selectedYear" />
    </div>
</template>
