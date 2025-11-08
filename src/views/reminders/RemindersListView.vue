<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { RouterLink } from "vue-router";
</script>

<template>
    <Button asChild>
        <RouterLink to="/reminder/add">
            <PlusCircleIcon />
            <span>Add Reminder</span>
        </RouterLink>
    </Button>
</template>
