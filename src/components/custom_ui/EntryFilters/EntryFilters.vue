<script setup lang="ts">
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { useAccounts } from '@/composable/accounts'
import { useDate } from '@/composable/useDate'
import { onMounted, ref, watch } from 'vue'
import type { ComboboxItemProp } from '../SearchableCombobox'
import { SearchableCombobox } from '../SearchableCombobox'

interface EntryFiltersProps {
  accountId?: number
  month?: number
  year?: number
  showAccountFilter?: boolean
  showMonthFilter?: boolean
  showYearFilter?: boolean
}

const emit = defineEmits<{
  'update:accountId': [accountId: number]
  'update:month': [month: number]
  'update:year': [year: number]
}>()

const props = withDefaults(defineProps<EntryFiltersProps>(), {
  month: () => new Date().getMonth(),
  year: () => new Date().getFullYear(),
  accountId: 0,
  showAccountFilter: true,
  showMonthFilter: true,
  showYearFilter: true,
})

const { fetch: fetchAccounts, fetchData: accountData } = useAccounts()
const { getMonthName, getCurrentYear } = useDate()

// Account filter state
const selectedAccount = ref<ComboboxItemProp | null>(null)
const accountItems = ref<ComboboxItemProp[]>([])
const isInitializing = ref(true)

// Month and year filter state
const currentYear = getCurrentYear()

const years: ComboboxItemProp[] = []
for (let i = currentYear - 10; i < currentYear + 10; i++) {
  years.push({ value: i, label: i.toString() })
}

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

const selectedYear = ref<ComboboxItemProp>({
  label: props.year.toString(),
  value: props.year,
})

const selectedMonth = ref<ComboboxItemProp>({
  label: getMonthName(props.month),
  value: props.month,
})

// Watchers
if (props.showAccountFilter) {
  watch(
    () => selectedAccount.value,
    selectedAccount => {
      if (!isInitializing.value && selectedAccount) {
        emit('update:accountId', selectedAccount.value)
      }
    },
    { deep: true }
  )
}

watch(
  () => selectedYear.value,
  newYear => {
    emit('update:year', newYear.value)
  },
  { deep: true }
)

watch(
  () => selectedMonth.value,
  newMonth => {
    emit('update:month', newMonth.value)
  },
  { deep: true }
)

// Lifecycle
onMounted(async () => {
  if (props.showAccountFilter) {
    await fetchAccounts()
    accountItems.value = accountData.value.accounts.map(it => ({
      label: it.name,
      value: it.id,
    }))

    // Set the initial selected account without triggering an emit
    if (props.accountId) {
      const initialAccount = accountItems.value.find(it => it.value === props.accountId)
      if (initialAccount) {
        selectedAccount.value = initialAccount
      }
    }

    // Allow future changes to emit updates
    isInitializing.value = false
  }
})
</script>

<template>
  <div class="flex flex-col px-4 py-3 bg-muted/30 rounded-md border border-border/50">
    <div class="mb-2 font-semibold">Filters</div>
    <!-- Account Filter - Primary -->
    <div class="flex flex-row gap-4">
      <div v-if="showAccountFilter" class="flex flex-row items-center gap-3 flex-[2] min-w-[280px]">
        <label class="text-base text-gray-900 min-w-[80px]">Account</label>
        <div v-if="accountData.accounts.length > 0" class="flex-1">
          <SearchableCombobox
            v-model="selectedAccount"
            :items="accountItems"
            placeholder="Select Account"
            search-placeholder="Select Account..."
            empty-message="No account found."
          />
        </div>
        <div v-else class="flex-1 flex items-center justify-center gap-2 py-2">
          <Spinner />
          <span class="text-sm text-gray-600">Loading...</span>
        </div>
      </div>

      <!-- Month Filter -->
      <div v-if="showMonthFilter" class="flex flex-row items-center gap-3 w-auto">
        <label class="text-sm font-medium text-gray-700 min-w-[50px]">Month</label>
        <div class="w-36">
          <SearchableCombobox
            v-model="selectedMonth"
            :items="months"
            placeholder="Select Month"
            search-placeholder="Select Month..."
            empty-message="No month found."
            button-class="w-full"
          />
        </div>
      </div>

      <!-- Year Filter -->
      <div v-if="showYearFilter" class="flex flex-row items-center gap-3 w-auto">
        <label class="text-sm font-medium text-gray-700 min-w-[40px]">Year</label>
        <div class="w-28">
          <SearchableCombobox
            v-model="selectedYear"
            :items="years"
            placeholder="Select Year"
            search-placeholder="Select Year..."
            empty-message="No year found."
            button-class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
