<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAccounts } from '@/composable/accounts'
import { onMounted, ref, watch } from 'vue'

interface AccountSelectorProps {
  month: number
  year: number
  accountId: number
}

const emit = defineEmits<{
  'update:accountId': [accountId: number]
}>()

const { fetch: fetchAccounts, fetchData: accountData } = useAccounts()
const props = defineProps<AccountSelectorProps>()
const selectedAccountId = ref<number>(props.accountId)
watch(
  () => selectedAccountId.value,
  newAccountID => {
    emit('update:accountId', newAccountID)
  },
  { deep: true }
)

onMounted(async () => {
  await fetchAccounts()
})
</script>

<template>
  <Tabs v-if="accountData.accounts.length > 0" v-model="selectedAccountId" class="flex flex-col gap-4">
    <TabsList class="flex flex-row flex-wrap w-full">
      <TabsTrigger v-for="account in accountData.accounts" :key="account.id" :value="account.id">
        {{ account.name }}
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
