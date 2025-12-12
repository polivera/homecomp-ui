<script setup lang="ts">
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { useAccounts } from '@/composable/accounts'
import { onMounted, ref, watch } from 'vue'
import type { ComboboxItemProp } from '../SearchableCombobox'
import { SearchableCombobox } from '../SearchableCombobox'

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
const selectedAccount = ref<ComboboxItemProp | null>(null)
const accountItems = ref<ComboboxItemProp[]>([])
const isInitializing = ref(true)

watch(
  () => selectedAccount.value,
  selectedAccount => {
    if (!isInitializing.value) {
      emit('update:accountId', selectedAccount?.value)
    }
  },
  { deep: true }
)

onMounted(async () => {
  await fetchAccounts()
  accountItems.value = accountData.value.accounts.map(it => ({
    label: it.name,
    value: it.id,
  }))

  // Set the initial selected account without triggering an emit
  const initialAccount = accountItems.value.find(it => it.value === props.accountId)
  if (initialAccount) {
    selectedAccount.value = initialAccount
  }

  // Allow future changes to emit updates
  isInitializing.value = false
})
</script>

<template>
  <div v-if="accountData.accounts.length > 0">
    <SearchableCombobox
      v-model="selectedAccount"
      :items="accountItems"
      placeholder="Select Account"
      search-placeholder="Select Account..."
      empty-message="No account found."
    />
  </div>
  <div v-else class="flex items-center justify-center gap-2 py-8">
    <Spinner />
    <span class="text-gray-600">Loading accounts...</span>
  </div>
</template>
