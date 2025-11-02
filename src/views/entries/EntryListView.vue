<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EntryList from "@/components/EntryList.vue";
import MonthAndYearSelect from "@/components/MonthAndYearSelect.vue";
import { ref } from "vue";

const accountList = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Compartida" },
    { id: 3, name: "Arg. Dólares" },
    { id: 4, name: "Arg. Dólares" },
];

const currDate = new Date();

const year = ref<number>(currDate.getFullYear());
const month = ref<number>(currDate.getMonth());
</script>

<template>
    <div class="flex justify-between items-center border-b">
        <h1 class="text-xl font-bold py-2 text-primary">Entry List</h1>
    </div>
    <div>
        <MonthAndYearSelect v-model:month="month" v-model:year="year" />
    </div>
    <div class="py-4">
        <Tabs
            :default-value="accountList[0]?.id.toString()"
            class="flex flex-col gap-4"
        >
            <TabsList class="flex flex-row flex-wrap w-full">
                <TabsTrigger
                    v-for="account in accountList"
                    :key="account.id"
                    :value="account.id.toString()"
                >
                    {{ account.name }}
                </TabsTrigger>
            </TabsList>
            <TabsContent
                class="m-4"
                v-for="account in accountList"
                :key="account.id"
                :value="account.id.toString()"
            >
                <EntryList
                    :accountID="account.id"
                    v-model:month="month"
                    v-model:year="year"
                />
            </TabsContent>
        </Tabs>
    </div>
</template>

<style scoped></style>
