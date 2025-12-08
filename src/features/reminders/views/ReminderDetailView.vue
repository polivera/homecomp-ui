<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { ReminderDetails } from "@/features/reminders/components";
import { ArrowLeftIcon } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex justify-between items-center border-b mb-5">
    <h1 class="text-xl font-bold py-2 text-primary">
      Reminder Details
    </h1>
    <Button
      variant="outline"
      as-child
    >
      <RouterLink to="/reminder/list">
        <ArrowLeftIcon />
        <span>Back</span>
      </RouterLink>
    </Button>
  </div>
  <ReminderDetails reminder-i-d="123123" />
</template>
