<script setup lang="ts">
import CreditCardEntryForm from "../components/CreditCardEntryForm.vue";
import Button from "@/components/ui/button/Button.vue";
import { ArrowLeftIcon } from "lucide-vue-next";
</script>

<template>
  <div class="flex justify-between items-center border-b">
    <h1 class="text-xl font-bold py-2 text-primary">
      Credit Card Entry Form - Add
    </h1>
    <Button
      variant="outline"
      as-child
    >
      <RouterLink to="/credit-card-entry/list">
        <ArrowLeftIcon />
        <span>Back</span>
      </RouterLink>
    </Button>
  </div>
  <div class="py-4">
    <CreditCardEntryForm />
  </div>
</template>
