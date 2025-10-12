<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import AppLayout from "@/layout/AppLayout.vue";
import {Toaster} from "@/components/ui/toast";

const route = useRoute();

</script>

<template>
  <!-- This is for pages that don't require (or have access to) complete app layout -->
  <RouterView v-if="route.meta.layout === 'simple'"/>
  <!-- Complete app layout -->
  <AppLayout v-else>
    <RouterView />
  </AppLayout>

  <Toaster/>
</template>

<style scoped>

</style>
