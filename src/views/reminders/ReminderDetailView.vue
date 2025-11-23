<script setup lang="ts">
import ReminderDetails from "@/components/ReminderDetails.vue";
import Button from "@/components/ui/button/Button.vue";
import { PlusCircleIcon } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="flex justify-between items-center border-b mb-5">
        <h1 class="text-xl font-bold py-2 text-primary">Reminder Details</h1>
        <Button asChild>
            <RouterLink to="/reminder/list">
                <PlusCircleIcon />
                <span>Back</span>
            </RouterLink>
        </Button>
    </div>
    <ReminderDetails reminderID="123123" />
</template>
