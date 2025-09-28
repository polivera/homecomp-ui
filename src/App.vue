<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import AppLayout from "@/layout/AppLayout.vue";

const route = useRoute();

</script>

<template>
  <RouterView v-if="route.meta.layout === 'simple'"/>
  <AppLayout v-else>
    <RouterView />
  </AppLayout>
</template>

<style scoped>

</style>
