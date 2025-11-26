<script setup lang="ts">
import ReminderForm from "@/components/ReminderForm.vue";
import Button from "@/components/ui/button/Button.vue";
import { ArrowLeftIcon } from "lucide-vue-next";
</script>

<template>
  <div class="flex justify-between items-center border-b">
    <h1 class="text-xl font-bold py-2 text-primary">Reminder Form - Add</h1>
    <Button variant="outline" asChild>
      <RouterLink to="/reminder/list">
        <ArrowLeftIcon />
        <span>Back</span>
      </RouterLink>
    </Button>
  </div>
  <div class="py-4">
    <ReminderForm />
  </div>
</template>

<style scoped></style>
