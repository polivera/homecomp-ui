<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { RouterLink } from 'vue-router'
import { MyAccountsList } from '@/features/accounts/components'
import { PlusCircleIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex justify-between items-center border-b mb-5">
    <h1 class="text-xl font-bold py-2 text-primary">My Accounts</h1>
    <Button as-child>
      <RouterLink to="/account/form">
        <PlusCircleIcon />
        <span>Add Account</span>
      </RouterLink>
    </Button>
  </div>
  <div class="flex flex-col gap-4 mt-5">
    <MyAccountsList />
  </div>
</template>
