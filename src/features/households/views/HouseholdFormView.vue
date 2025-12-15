<script setup lang="ts">
import { HouseholdForm } from '@/features/households/components'
import Button from '@/components/ui/button/Button.vue'
import { ArrowLeftIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex justify-between items-center border-b">
    <h1 class="text-xl font-bold py-2 text-primary">Household Form - Add</h1>
    <Button variant="outline" as-child>
      <RouterLink to="/household/list">
        <ArrowLeftIcon />
        <span>Back</span>
      </RouterLink>
    </Button>
  </div>
  <div class="py-4">
    <HouseholdForm />
  </div>
</template>

<style scoped></style>
