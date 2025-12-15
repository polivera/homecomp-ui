<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { RouterLink } from 'vue-router'
import { CreditCardList } from '@/features/credit_cards/components'
import { PlusCircleIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex justify-between items-center border-b mb-5">
    <h1 class="text-xl font-bold py-2 text-primary">Credit Cards</h1>
    <Button as-child>
      <RouterLink to="/credit-card/form">
        <PlusCircleIcon />
        <span>Add Credit Card</span>
      </RouterLink>
    </Button>
  </div>
  <div class="flex flex-col gap-4 mt-5">
    <CreditCardList />
  </div>
</template>
