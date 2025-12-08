<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full">
      <SidebarTrigger />
      <div class="mx-auto max-w-7xl px-4 py-4">
        <RouterView />
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped></style>

