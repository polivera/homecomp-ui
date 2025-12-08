<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { EntryList } from '@/features/entries/components'
import { MonthAndYearSelect } from '@/components/custom_ui/MonthAndYearSelect'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PlusCircleIcon } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { useDate } from '@/composable/useDate'
import { useAccounts } from '@/composable/accounts'
import Spinner from '@/components/ui/spinner/Spinner.vue'

// TODO: Move account selector to its own component
// TODO: Improve the spinner style for the tabs and move it to the center

const { fetch: fetchAccounts, fetchData: accountData } = useAccounts()
const { getCurrentMonth, getCurrentYear } = useDate()

const year = ref<number>(getCurrentYear())
const month = ref<number>(getCurrentMonth())
const selectedAccountId = ref<number | undefined>(undefined)

onMounted(async () => {
  await fetchAccounts()
  selectedAccountId.value = accountData.value.accounts[0].id
})
</script>

<template>
  <div class="flex justify-between items-center border-b">
    <h1 class="text-xl font-bold py-2 text-primary">Entry List</h1>
    <Button as-child>
      <RouterLink to="/entry/form">
        <PlusCircleIcon />
        <span>Add Entry</span>
      </RouterLink>
    </Button>
  </div>
  <div>
    <MonthAndYearSelect v-model:month="month" v-model:year="year" />
  </div>
  <div class="py-4">
    <div v-if="accountData.accounts.length === 0" class="justify-center items-center">
      <Spinner />
    </div>
    <Tabs v-if="accountData.accounts.length > 0" v-model="selectedAccountId" class="flex flex-col gap-4">
      <TabsList class="flex flex-row flex-wrap w-full">
        <TabsTrigger v-for="account in accountData.accounts" :key="account.id" :value="account.id">
          {{ account.name }}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="account in accountData.accounts"
        :key="account.id"
        class="m-4 flex flex-col"
        :value="account.id"
      >
        <EntryList v-model:month="month" v-model:year="year" :account-i-d="account.id" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped></style>
