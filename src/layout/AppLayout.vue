<script setup lang="ts">

</script>

<template>
  <div class="dashboard-wrapper">
    <div> header </div>
    <div class="main-container">
      <div> sidebar </div>
      <main class="content">
        <slot /> <!-- Page content goes here -->
      </main>
    </div>
    <div> footer </div>
  </div>
</template>

<style scoped>

</style>